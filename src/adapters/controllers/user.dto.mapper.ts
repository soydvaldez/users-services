import { User as UserBusiness } from "../../services/models/user.model";
import { UserControllerModel as UserControllerModel } from "../../controllers/models/user";
import {
  RegisterUserDTO,
  Roles,
} from "../../controllers/models/register.userDTO";

export class UserDtoMapper {
  static toModelController(userBusiness: UserBusiness): UserControllerModel {
    const ctrlModel = new UserControllerModel();
    ctrlModel.firstName = userBusiness.getFirstName();
    ctrlModel.lastName = userBusiness.getLastName();
    ctrlModel.email = userBusiness.getEmail();
    ctrlModel.role = userBusiness.getRol();
    // Omite password si no es necesario en el contexto del controlador.
    ctrlModel.password = userBusiness.getPassword() ?? "";
    return ctrlModel;
  }

  static mapListToControllerModel(
    userBusinesses: UserBusiness[]
  ): UserControllerModel[] {
    return userBusinesses.map(UserDtoMapper.toModelController);
  }

  static toModelBusiness(
    userControllerModel: UserControllerModel
  ): UserBusiness {
    const userBuilder = UserBusiness.Builder;

    userBuilder
      .setfirstName(userControllerModel.firstName)
      .setlastName(userControllerModel.lastName)
      .setEmail(userControllerModel.email)
      .setPassword(userControllerModel.password)
      .setRoleId(userControllerModel.roleId);

    return userBuilder.build();
  }

  static mapListToBusinessModel(
    userControllerModels: UserControllerModel[]
  ): UserBusiness[] {
    return userControllerModels.map(UserDtoMapper.toModelBusiness);
  }

  static registerUserDTOtoModelBusiness(
    registerUserDTO: RegisterUserDTO
  ): UserBusiness {
    const userBuilder = UserBusiness.Builder;

    userBuilder
      .setfirstName(registerUserDTO.firstName)
      .setlastName(registerUserDTO.lastName)
      .setEmail(registerUserDTO.email)
      .setPassword(registerUserDTO.password)
      .setRoleId(Number(Roles[registerUserDTO.role]));

    return userBuilder.build();
  }
}
