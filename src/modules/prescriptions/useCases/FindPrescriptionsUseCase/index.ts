import { PrescriptionsRepository } from "../../repositories/implementations/PrescriptionsRepository";
import { FindPrescriptionsUseCase } from "./FindPrescriptionsUseCase";

export const findPrescriptionsUseCase = new FindPrescriptionsUseCase(new PrescriptionsRepository());