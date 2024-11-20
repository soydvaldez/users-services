import { DataSource, Repository } from "typeorm";
import { User } from "../entities/User";
import { NewUser } from "../../../interface/user.interface";
import { UserAdapter } from "../adapters/user.adapter";
import { Role } from "../entities/Role";
import { UserEntityMapper } from "../../../adapters/data/user.entity.mapper";
import { User as UserBusiness } from "../../../services/models/user.model";
import { CreateUser } from "../../../services/models/user";

type UserFindResult = {
  id: number;
  email: string;
  password: string;
  role: Role;
};

export class UserRepository {
  createUser(users: NewUser[]) {
    throw new Error("Method not implemented.");
  }
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

  async getAll(): Promise<UserBusiness[]> {
    try {
      const users = await this.userRepository.manager.find(User);
      return UserEntityMapper.mapListToBusinessModel(users);
    } catch (error) {
      console.error("Error al consultar usuarios:", error);
      return [];
    }
  }

  async getById(id: number): Promise<UserBusiness> {
    try {
      const id = 1;

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

  async findByEmail(email: string): Promise<UserFindResult> {
    try {
      const usersFindedByEmail: User | null =
        await this.userRepository.manager.findOne(User, {
          where: { email },
        });

      if (!usersFindedByEmail) {
        throw new Error("User not found");
      }

      return {
        id: usersFindedByEmail.id,
        email: usersFindedByEmail.email,
        password: usersFindedByEmail.password,
        role: usersFindedByEmail.role,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error("error");
    }
  }
}
