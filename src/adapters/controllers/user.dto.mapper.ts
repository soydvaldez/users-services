import { User as UserBusiness } from "../../services/models/user.model";
import { UserControllerModel as UserControllerModel } from "../../controllers/models/user";

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

  static toModelBusiness(
    userControllerModel: UserControllerModel
  ): UserBusiness {
    return UserBusiness.Builder.setfirstName(userControllerModel.firstName)
      .setlastName(userControllerModel.lastName)
      .setEmail(userControllerModel.email)
      .setPassword(userControllerModel.password)
      .build();
  }

  static mapListToControllerModel(
    userBusinesses: UserBusiness[]
  ): UserControllerModel[] {
    return userBusinesses.map(UserDtoMapper.toModelController);
  }

  static mapListToBusinessModel(
    userControllerModels: UserControllerModel[]
  ): UserBusiness[] {
    return userControllerModels.map(UserDtoMapper.toModelBusiness);
  }
}
