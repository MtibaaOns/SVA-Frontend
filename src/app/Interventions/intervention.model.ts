export interface Intervention {
    id: number;
    code: string;
    dateDeb: string;
    dateFin: string;
    duree: string;
    observation: string;
    cloturer: boolean;
    montantHT: number;
    facturer: boolean;
    cause: string;
    technicien:string
    client:string
    selected?: boolean;
  }