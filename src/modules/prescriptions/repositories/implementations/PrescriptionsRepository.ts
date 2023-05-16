import { AxiosHttpClient } from "../../../../infra/http/AxiosHttpClient";
import { ICreatePrescriptionDTO } from "../../dtos/ICreatePrescriptionDTO";
import { IFindPrescriptionsDTO } from "../../dtos/IFindPrescriptionsDTO";
import { Prescription } from "../../entities/Prescription";
import { IPrescriptionsRepository } from "../IPrescriptionsRepository";

export class PrescriptionsRepository implements IPrescriptionsRepository {
  async findAll(params: IFindPrescriptionsDTO | undefined): Promise<Prescription[]> {
    const response = await AxiosHttpClient.get('/prescription', {
      params
    });
    const savedPrescriptions = localStorage.getItem("prescriptions");
    if (savedPrescriptions) {
      return [...response.data.content, ...JSON.parse(savedPrescriptions)]|| [];
    }
    return response.data.content || [];
  }
  async create(params: ICreatePrescriptionDTO): Promise<Prescription> {
    throw new Error("Method not implemented.");
  }

}