import { DataSource, Repository } from "typeorm";
import { User } from "../entities/User";
import { NewUser } from "../../../interface/user.interface";
import { UserAdapter } from "../adapters/user.adapter";
import { Role } from "../entities/Role";
import { UserEntityMapper } from "../../../adapters/data/user.entity.mapper";
import { User as UserBusiness } from "../../../services/models/user.model";

type UserFindResult = {
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

  async createUser(newUser: NewUser[]): Promise<User | undefined> {
    
    try {
      if (newUser && newUser.length === 1) {
        const userEntity = UserAdapter.mapNewUserToEntity(newUser[0]);
        const userEntitySaved: User = await this.userRepository.manager.save(
          userEntity
        );
        // console.log("Usuario guardado con éxito", userEntitySaved);
        return userEntitySaved;
      } else {
        // Persiste un arreglo de usuarios
        const userEntities = UserAdapter.mapNewUserListToEntityList(newUser);
        await this.userRepository.manager.save(userEntities);
        console.log("Lost usuarios se guardaron con éxito");
        // return userEntitiesSaved;
      }
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      return undefined; // Retorna undefined en caso de error
    }
  }

  /*async updateUser(inUserUpdate: User) {
    await this.ensureInitialized();

    const userUpdate = new User();
    userUpdate.id = inUserUpdate.id;
    userUpdate.firstName = inUserUpdate.firstName;
    userUpdate.lastName = inUserUpdate.lastName;
    userUpdate.email = inUserUpdate.email;
    userUpdate.isActive = inUserUpdate.isActive;

    try {
      const result = await this.userRepository.manager
        .createQueryBuilder()
        .update(User)
        .set({
          // firstname: userUpdate.firstName,
          lastname: userUpdate.lastName,
          email: userUpdate.email,
          password: "temporal1234",
          is_active: userUpdate.isActive,
        })
        .where("id = :id", { id: userUpdate.id })
        .execute();
      console.log("Usuario actualizado con éxito", result);
      return result;
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      return undefined; // Retorna undefined en caso de error
    }
  }*/

  async getAll(): Promise<UserBusiness[]> {
    
    try {
      const users = await this.userRepository.manager.find(User);
      return UserEntityMapper.mapListToBusinessModel(users);
    } catch (error) {
      console.error("Error al consultar usuarios:", error);
      return [];
    }
  }

  // Método para cerrar la conexión
  async closeConnection() {
    try {
      // await this.userRepository.destroy(); // Cerrar la conexión
      console.log("Conexión a la base de datos cerrada.");
    } catch (error) {
      console.error("Error al cerrar la conexión:", error);
    }
  }

  async findByEmail(email: string): Promise<UserFindResult> {
    try {
      const usersFindedByEmail: User | null =
        await this.userRepository.manager.findOne(User, {
          where: { email },
        });

      if (usersFindedByEmail != null && usersFindedByEmail != undefined) {
        return {
          email: usersFindedByEmail.email,
          password: usersFindedByEmail.password,
          role: usersFindedByEmail.role,
        };
      }
      return {
        email: "",
        password: "",
        role: {
          name: "",
        },
      };
    } catch (error: any) {
      console.log(error);
      throw new Error("error");
    }
  }

  // Método para obtener la instancia
  // public static getInstance(): UserRepository {
  // if (!UserRepository.instance) {
  // UserRepository.instance = new UserRepository();
  // }
  // return UserRepository.instance;
  // }
}
