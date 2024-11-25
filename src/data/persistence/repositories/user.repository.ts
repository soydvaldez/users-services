import { Repository } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { NewUser } from "../../../interface/user.interface";
import { UserEntityMapper } from "../../../adapters/data/user.entity.mapper";
import { User as UserBusiness } from "../../../services/models/user.model";
import { AppDataSource } from "../persistence.module";
import { UserUpdateDTO } from "../../../controllers/models/update.userDTO";

type UserFindResult = {
  id: number;
  email: string;
  password: string;
  role: Role;
};

export class UserRepository {
  private static instance: UserRepository;
  private userRepository: Repository<User>;

  constructor(repository: Repository<User>) {
    // this.userRepository = dataSource.getRepository(User);
    this.userRepository = repository;
  }

  // async createUser(): Promise<User | undefined> {
  //   try {
  //     if (newUser && newUser.length === 1) {
  //       const userEntity = UserAdapter.mapNewUserToEntity(newUser[0]);
  //       const userEntitySaved: User = await this.userRepository.manager.save(
  //         userEntity
  //       );
  //       // console.log("Usuario guardado con éxito", userEntitySaved);
  //       return userEntitySaved;
  //     } else {
  //       // Persiste un arreglo de usuarios
  //       const userEntities = UserAdapter.mapNewUserListToEntityList(newUser);
  //       await this.userRepository.manager.save(userEntities);
  //       console.log("Lost usuarios se guardaron con éxito");
  //       // return userEntitiesSaved;
  //     }
  //   } catch (error) {
  //     console.error("Error al guardar el usuario:", error);
  //     return undefined; // Retorna undefined en caso de error
  //   }
  // }

  async save(user: User) {
    try {
      const userSaved: User = await this.userRepository.save(user);
      if (!userSaved) {
        throw new Error("User not saved");
      }
      return userSaved;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.manager.find(User);
      if (!users) {
        throw new Error("not content");
      }
      return users;
    } catch (error) {
      console.error("Error al consultar usuarios:", error);
      return [];
    }
  }

  async getActiveUsers() {
    try {
      // Pon una query para filtrar a los usuarios

      const users: User[] = await AppDataSource!
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.role", "role")
        .where("user.isActive = :isActive", { isActive: true })
        .getMany();

      if (users?.length === 0) {
        throw new Error("No active users found");
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<UserBusiness> {
    try {
      const result = await this.userRepository.manager.findOne(User, {
        where: { id },
      });
      if (!result) {
        throw new Error("User not found");
      }

      return UserEntityMapper.toBusinessModel(result);
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserFindResult | null> {
    try {
      const usersFindedByEmail: User | null =
        await this.userRepository.manager.findOne(User, {
          where: { email },
        });

      if (!usersFindedByEmail) {
        return null;
      }

      return {
        id: usersFindedByEmail.id,
        email: usersFindedByEmail.email,
        password: usersFindedByEmail.password,
        role: usersFindedByEmail.role,
      };
    } catch (err) {
      console.log(err);
      throw new Error("error");
    }
  }

  async update(userId: number, user: NewUser) {
    try {
      const userFinded = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!userFinded) {
        throw new Error("User  not found");
      }
      Object.assign(userFinded, user);
      await this.userRepository.save(userFinded);
      return userFinded;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      const result = await this.userRepository.update(id, {
        isActive: false,
        updatedAt: new Date(),
      });
      if (!result) {
        throw new Error("User not update");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateRole(userId: number, roleId: number) {
    try {
      const userFinded = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!userFinded) {
        return null;
      }

      if (userFinded.roleId === roleId) {
        throw new Error("User rolId already assignent");
      }

      const result = await this.userRepository.update(userId, {
        roleId: roleId
      });
      if (!result) {
        throw new Error("User not update");
      }
    } catch (error) {
      throw new Error("error data layer");
    }
  }
}
