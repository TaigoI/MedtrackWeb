import { IFindPrescriptionsDTO } from "../../dtos/IFindPrescriptionsDTO";
import { Prescription } from "../../entities/Prescription";
import { IPrescriptionsRepository } from "../../repositories/IPrescriptionsRepository";

export class FindPrescriptionsUseCase {
  constructor(
    readonly repository: IPrescriptionsRepository
  ) {}

  async execute(params: IFindPrescriptionsDTO | undefined): Promise<Prescription[]> {
    return this.repository.findAll(params);
  }
}