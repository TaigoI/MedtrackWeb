export class User {
  constructor(
    readonly  id: number,
    readonly  name: string,
    readonly  cpf: string,
    readonly  email: string,
    readonly  password: string,
    readonly  gender: string,
    readonly  councilRegistration: string,
    readonly  birthdate: Date,
    readonly  mobilePhone: string,
    readonly  businessPhone: string,
    readonly  createdAt: Date,
    readonly  updatedAt: Date,
  ) {}
}