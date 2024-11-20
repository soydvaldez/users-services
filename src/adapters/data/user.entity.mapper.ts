import { User as UserEntity } from "../../data/persistence/entities/User";
import { CreateUser } from "../../services/models/user";
import { User as UserBusiness } from "../../services/models/user.model";

export class UserEntityMapper {
  // Método para mapear de UserEntity a UserBusiness
  static toBusinessModel(userEntity: UserEntity): UserBusiness {
    return UserBusiness.Builder.setfirstName(userEntity.firstName)
      .setlastName(userEntity.lastName)
      .setEmail(userEntity.email)
      .setPassword(userEntity.password)
      .setRole(userEntity.role)
      .build();
  }

  // Método genérico para mapear listas usando los métodos anteriores
  static mapListToBusinessModel(userEntities: UserEntity[]): UserBusiness[] {
    return userEntities.map(UserEntityMapper.toBusinessModel);
  }

  // Método para mapear de UserBusiness a UserEntity
  static toEntityModel(userBusiness: UserBusiness): UserEntity {
    const userEntity = new UserEntity();
    userEntity.firstName = userBusiness.getFirstName();
    userEntity.lastName = userBusiness.getLastName();
    userEntity.email = userBusiness.getEmail();
    userEntity.password = userBusiness.getPassword();
    return userEntity;
  }

  static mapListToEntityModel(userBusinesses: UserBusiness[]): UserEntity[] {
    return userBusinesses.map(UserEntityMapper.toEntityModel);
  }

  static createUserToEntity(createUser: CreateUser) {
    const userEntity = new UserEntity();
    userEntity.firstName = createUser.getFirstName();
    userEntity.lastName = createUser.getLastName();
    userEntity.email = createUser.getEmail();
    userEntity.password = createUser.getPassword();
    userEntity.roleId = createUser.getRolId()
    return userEntity;
  }
}
