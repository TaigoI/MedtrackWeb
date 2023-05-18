import { ISignUpDTO } from "../../dtos/ISignUpDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class SignUpUseCase {
  constructor(readonly repository: IUsersRepository) {}

  async execute(data: ISignUpDTO): Promise<User> {
    return this.repository.signup(data);
  }
}