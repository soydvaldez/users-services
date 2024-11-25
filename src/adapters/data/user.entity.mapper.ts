import { User as UserEntity } from "../../data/persistence/entities/User";
import { NewUser } from "../../services/models/newuser";
import { User as UserBusiness } from "../../services/models/user.model";

export class UserEntityMapper {
  // Método para mapear de UserEntity a UserBusiness
  static toBusinessModel(userEntity: UserEntity): UserBusiness {
    let userBusiness = UserBusiness.Builder;
    userBusiness
      .setId(userEntity.id)
      .setfirstName(userEntity.firstName)
      .setlastName(userEntity.lastName)
      .setEmail(userEntity.email)
      .setPassword(userEntity.password)
      .setRole(userEntity.role)
      .setIsActive(userEntity.isActive);

    return userBusiness.build();
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

  // Mappers para crear nuevos usuarios
  static newUserToEntity(newUser: NewUser): UserEntity {
    const userEntity = new UserEntity();
    userEntity.firstName = newUser.getFirstName();
    userEntity.lastName = newUser.getLastName();
    userEntity.email = newUser.getEmail();
    userEntity.password = newUser.getPassword();
    userEntity.roleId = newUser.getRolId();
    return userEntity;
  }

  static newUserListToEntities(newUsers: NewUser[]): UserEntity[] {
    return newUsers.map(UserEntityMapper.newUserToEntity);
  }
}
