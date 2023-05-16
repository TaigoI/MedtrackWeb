import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export const authenticateUserUseCase = new AuthenticateUserUseCase(new UsersRepository());