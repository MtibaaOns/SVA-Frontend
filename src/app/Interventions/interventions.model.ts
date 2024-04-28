export interface Intervention {
    id: number;
    code: string;
    dateDeb: string; 
    dateFin: string; 
    duree: string;
    observation: string;
    cloturer: boolean;
    MontantHT: number;
    facturer: boolean;
    cause: string;
}