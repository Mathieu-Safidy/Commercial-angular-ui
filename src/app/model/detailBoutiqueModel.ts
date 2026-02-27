
export interface DetailBoutique {
  _id: string;
  idBoutique: Boutique;
  description: string;
  email : string
  adresse: string;
  telephone: string;
  descriptionHoraire?: string;
  noteMoyen?: number;
  image: string;
  status?: number;
}
