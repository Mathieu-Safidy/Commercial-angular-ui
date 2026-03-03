//  "boutique": {
//                     "_id": "698dff42709de29d54628ca3",
//                     "nom": "Massin",
//                     "description": "Boutique de materiels informatiques",
//                     "idUser": "698dfddc709de29d54628ca1",
//                     "idCategorie": "698dfde1709de29d54628ca2",
//                     "createdAt": "2026-02-12T16:26:42.503Z",
//                     "deletedAt": null
//                 }
interface Boutique {
    _id: string;
    nom: string;
    description: string;
    idUser: string;
    idCategorie: Categorie | string;
    createdAt: Date;
    deletedAt: Date | null;
    image?: string;
}
