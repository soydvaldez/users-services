import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config/datasource";
import { NewUser } from "../../../interface/user.interface";
import { UserAdapter } from "../adapters/user.adapter";
import { Role } from "../entities/Role";

type UserFindResult = {
  email: string;
  password: string;
  role: Role;
};

export class UserRepository {
  private datasourceInitialized: Promise<DataSource>;
  private static instance: UserRepository;

  constructor() {
    this.datasourceInitialized = AppDataSource.initialize();
  }

  private async ensureInitialized() {
    try {
      await this.datasourceInitialized;
      console.log("Base de datos inicializada");
    } catch (error) {
      console.error("Error al inicializar la base de datos:", error);
      throw error; // Propagar el error
    }
  }

  async createUser(newUser: NewUser[]): Promise<User | undefined> {
    await this.ensureInitialized();
    try {
      if (newUser && newUser.length === 1) {
        const userEntity = UserAdapter.mapNewUserToEntity(newUser[0]);
        const userEntitySaved: User = await AppDataSource.manager.save(
          userEntity
        );
        // console.log("Usuario guardado con éxito", userEntitySaved);
        return userEntitySaved;
      } else {
        // Persiste un arreglo de usuarios
        const userEntities = UserAdapter.mapNewUserListToEntityList(newUser);
        await AppDataSource.manager.save(userEntities);
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
      const result = await AppDataSource.manager
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

  async getAllUsers(): Promise<User[]> {
    await this.ensureInitialized();

    try {
      const users: User[] = await AppDataSource.manager.find(User);
      // console.log("Todos los usuarios encontrados:", users);

      return users;
    } catch (error) {
      console.error("Error al consultar usuarios:", error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  }

  // Método para cerrar la conexión
  async closeConnection() {
    try {
      await AppDataSource.destroy(); // Cerrar la conexión
      console.log("Conexión a la base de datos cerrada.");
    } catch (error) {
      console.error("Error al cerrar la conexión:", error);
    }
  }

  async findByEmail(email: string): Promise<UserFindResult> {
    await this.ensureInitialized();

    try {
      const usersFindedByEmail: User | null =
        await AppDataSource.manager.findOne(User, {
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
  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
}

// Uso del servicio
function initdata() {
  (async () => {
    const userRepository = new UserRepository();
    const newUser = new User();
    newUser.firstName = "John";
    newUser.lastName = "Doe";
    newUser.email = "user1@domain.com";
    newUser.isActive = true;

    try {
      const userCreated = await userRepository.createUser(getUser());
      if (userCreated) {
        console.log("Usuario creado:", userCreated);
      }

      const users: User[] = await userRepository.getAllUsers();
      if (users.length === 0) {
        console.log("No hay usuarios en la base de datos.");
      } else {
        console.log("Usuarios en la base de datos:");
        users.forEach((user) => {
          console.log(user);
        });
      }
    } catch (error) {
      console.log(error);
    }
  })();

  function getUser(): NewUser[] {
    let user1: NewUser = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@domain.com",
      isActive: true,
      password: "",
    };

    let user2: NewUser = {
      firstName: "Joe",
      lastName: "Smith",
      email: "joesmith@domain.com",
      isActive: true,
      password: "",
    };
    return [user1, user2];
  }
}

// initdata();
