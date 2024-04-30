export interface Intervention {
    id: number;
    code: string;
    dateDeb: Date;
    dateFin: Date;
    duree: string;
    observation: string;
    cloturer: boolean;
    montantHT: number;
    facturer: boolean;
    cause: string;
  }