import { IAuthenticationDTO } from "../dtos/IAuthenticationDTO";
import { ISignUpDTO } from "../dtos/ISignUpDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  authenticate(data: IAuthenticationDTO): Promise<User>;
  signup(data: ISignUpDTO): Promise<User>;
}