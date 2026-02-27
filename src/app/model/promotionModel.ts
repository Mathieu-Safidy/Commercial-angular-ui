export interface Promotion {
  _id: string;
  valeur: number;             
  idEvenement: string
  dateDebut: Date;
  dateFin: Date | null;
  idProduit: Produit   
  reduction: number;           
}
