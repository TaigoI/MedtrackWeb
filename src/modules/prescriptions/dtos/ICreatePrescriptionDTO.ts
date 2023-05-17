export interface ICreatePrescriptionDTO {
  title: string;
  description: string;
  template: boolean;
  templateTitle: string;
  templateDescription: string;
  items: 
    {
      medicationPresentationDosageId: number;
      doseAmount: number;
      interval: number;
      intervalUnit: string;
      occurrences: number;
      comments:string;
    }[]
    
}