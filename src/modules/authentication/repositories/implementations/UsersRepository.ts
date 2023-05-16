import { AxiosHttpClient } from "../../../../infra/http/AxiosHttpClient";
import { IAuthenticationDTO } from "../../dtos/IAuthenticationDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async authenticate(data: IAuthenticationDTO): Promise<User> {
    return await AxiosHttpClient.post('/auth/login', data);
  }
}