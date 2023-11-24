import { AppError } from "@app/utils";
import { RegisterInputData } from "./auth.interface";
import UserModel, { User } from "@app/api/user/user.model"

export class AuthService {
  public async signup(userData: RegisterInputData): Promise<User> {
    const user = await UserModel.findOne({ email: userData.email });

    if (user !== null) {
      throw new AppError(409, 'User already exist');
    }

    const newUser = await UserModel.create(userData);
    
    return newUser;
  }
}