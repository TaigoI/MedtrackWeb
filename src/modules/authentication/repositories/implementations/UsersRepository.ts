import Cookies from "js-cookie";
import { AxiosHttpClient } from "../../../../infra/http/AxiosHttpClient";
import { SimpleAxiosHttpClient } from "../../../../infra/http/SimpleAxiosHttpClient";
import { IAuthenticationDTO } from "../../dtos/IAuthenticationDTO";
import { ISignUpDTO } from "../../dtos/ISignUpDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async signup(data: ISignUpDTO): Promise<User> {
    Cookies.remove('accessToken');
    const response = await SimpleAxiosHttpClient.post('/auth/signup', data);
    if (response.status !== 200) throw new Error(response.data)
    return this.authenticate({
      password: data.password,
      username: data.cpf,
    });
  }

  async authenticate(data: IAuthenticationDTO): Promise<User> {
    Cookies.remove('accessToken');
    const response = await AxiosHttpClient.post('/auth/login', data);
    if (response.status !== 200) throw new Error(response.data)
    const userResponse = await AxiosHttpClient.get('/user');
    if (userResponse.status !== 200) throw new Error(userResponse.data)
    return userResponse.data;
  }
}