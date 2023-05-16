import { ICreatePrescriptionDTO } from "../dtos/ICreatePrescriptionDTO";
import { IFindPrescriptionsDTO } from "../dtos/IFindPrescriptionsDTO";
import { Prescription } from "../entities/Prescription";


export interface IPrescriptionsRepository {
  findAll(params: IFindPrescriptionsDTO | undefined): Promise<Prescription[]>;
  create(params: ICreatePrescriptionDTO): Promise<Prescription>;
}