import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { SignUpUseCase } from "./SignUpUseCase";

export const signUpUseCase = new SignUpUseCase(new UsersRepository());