export interface DetailLocation {
  _id: string;
  idLocation: {
    _id: string;
    idUser: { _id: string; username: string };
  };
  idBox: {
    _id: string;
    numero: string;
    dimension: string;
  };
  dateDebut: string;
  dateFin?: string;
  prixFinal: number;
  status: 'en attente' | 'valide' | 'annulee';
}
