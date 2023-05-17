import { AxiosHttpClient } from "../../../../infra/http/AxiosHttpClient";
import { IAuthenticationDTO } from "../../dtos/IAuthenticationDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async authenticate(data: IAuthenticationDTO): Promise<User> {
    console.log('BEFORE')
    const response = await AxiosHttpClient.post('/auth/login', data);
    console.log('📸',response.status)
    if (response.status !== 200) throw new Error(response.data)
    return response.data;
  }
}