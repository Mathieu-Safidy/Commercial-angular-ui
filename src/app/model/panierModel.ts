// "details": [
//         {
//             "_id": "6991bd986ef5c0ff88628ca2",
//             "idPanier": "6991bd856ef5c0ff88628ca1",
//             "idProduit": "699075f6489c38b47f628ca1",
//             "quantite": 5,
//             "deletedAt": null,
//             "createdAt": "2026-02-15T12:35:36.382Z",
//            "produit": {
//         }
//     ],
//     "_id": "6991bd856ef5c0ff88628ca1",
//     "idUser": "698dfddc709de29d54628ca1",
//     "createdAt": "2026-02-15T12:35:17.541Z",
//     "deletedAt": null,
//     "state": "en_cours"
// }
interface Panier {
    _id: string;
    idUser: string;
    createdAt: Date;
    deletedAt: Date | null;
    state: string;
    details: PanierDetail[];
}