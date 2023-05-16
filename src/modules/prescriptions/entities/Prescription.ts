import { User } from "../../authentication/entities/User";
import { PrescriptionItem } from "./PrescriptionItem";

export class Prescription {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly user: User['id'],
    readonly createdAt: Date,
    readonly itemList: PrescriptionItem[],
    readonly template: boolean,
    readonly templateTitle: string,
    readonly templateDescription: string,
    readonly checked?: boolean,
  ) {}
}