import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { AppDataSource } from "./config/datasource";

export class UserService {
  private datasourceInitialized: Promise<DataSource>;
  private static instance: UserService;

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

  async createUser(newUser: User): Promise<User | undefined> {
    await this.ensureInitialized();

    const user = new User();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.email = newUser.email;
    user.isActive = newUser.isActive;

    try {
      const userSaved: User = await AppDataSource.manager.save(user);
      console.log("Usuario guardado con éxito", userSaved);
      return userSaved;
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      return undefined; // Retorna undefined en caso de error
    }
  }

  async getAllUsers(): Promise<User[]> {
    await this.ensureInitialized();

    try {
      const users: User[] = await AppDataSource.manager.find(User);
      console.log("Todos los usuarios encontrados:", users);
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

  async findByEmail(email: string) {
    await this.ensureInitialized();

    try {
      const usersFindedByEmail = await AppDataSource.manager.findOne(User, {
        where: { email },
      });

      return usersFindedByEmail;
    } catch (error: any) {
      console.log(error);
    }
  }

  // Método para obtener la instancia
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
}

// Uso del servicio
async () => {
  const userService = new UserService();
  const newUser = new User();
  newUser.firstName = "John";
  newUser.lastName = "Doe";
  newUser.email = "user1@domain.com";
  newUser.isActive = true;

  const userCreated = await userService.createUser(newUser);
  if (userCreated) {
    console.log("Usuario creado:", userCreated);
  }

  const users: User[] = await userService.getAllUsers();
  if (users.length === 0) {
    console.log("No hay usuarios en la base de datos.");
  } else {
    console.log("Usuarios en la base de datos:");
    users.forEach((user) => {
      console.log(user);
    });
  }

  await userService.closeConnection();
};
