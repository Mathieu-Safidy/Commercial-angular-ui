//  "produit": {
//                 "_id": "699075f6489c38b47f628ca1",
//                 "nom": "Ordinateur portable",
//                 "description": "Un ordinateur portable puissant pour le travail et les loisirs",
//                 "idBoutique": "698dff42709de29d54628ca3",
//                 "idCategorie": "698dfde1709de29d54628ca2",
//                 "prixInitial": 999.99,
//                 "consultationCount": 0,
//                 "modifiedAt": null,
//                 "createdAt": "2026-02-14T13:17:42.077Z",
//                 "deletedAt": null,
//                 "quantiteDisponible": 10,
//                 "boutique": {
//                     "_id": "698dff42709de29d54628ca3",
//                     "nom": "Massin",
//                     "description": "Boutique de materiels informatiques",
//                     "idUser": "698dfddc709de29d54628ca1",
//                     "idCategorie": "698dfde1709de29d54628ca2",
//                     "createdAt": "2026-02-12T16:26:42.503Z",
//                     "deletedAt": null
//                 }
//             }

interface Produit {
    _id: string;
    nom: string;
    description: string;
    idBoutique: string;
    idCategorie: any;
    prixInitial: number;
    reduction?: number; 
    consultationCount: number;
    modifiedAt: Date | null;
    createdAt: Date;
    deletedAt: Date | null;
    quantiteDisponible: number;
    boutique: Boutique;
    status?: string; // Ajout d'un champ de statut pour la gestion du stock
    image?: string; // URL de l'image du produit
    categorie?: string; // Nom de la catégorie du produit
    rating?: number; // Note moyenne du produit
    isNew?: boolean; // Indique si le produit est nouveau
    isSale?: boolean; // Indique si le produit est en promotion
    salePercent?: number; // Pourcentage de réduction si le produit est en promotion
}
