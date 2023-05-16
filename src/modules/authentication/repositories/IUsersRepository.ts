import { IAuthenticationDTO } from "../dtos/IAuthenticationDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  authenticate(data: IAuthenticationDTO): Promise<User>;
}