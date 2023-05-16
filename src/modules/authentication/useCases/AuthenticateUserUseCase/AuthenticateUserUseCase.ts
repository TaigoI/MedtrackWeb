import { IAuthenticationDTO } from "../../dtos/IAuthenticationDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class AuthenticateUserUseCase {
  constructor(readonly repository: IUsersRepository) {}

  async execute(data: IAuthenticationDTO): Promise<User> {
    return this.repository.authenticate(data);
  }
}