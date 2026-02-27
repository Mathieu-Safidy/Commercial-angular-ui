//   idProduit: { type: mongoose.Schema.Types.ObjectId, ref: 'produit', required: true },
//     idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
//     nombreEtoiles: { type: Number, required: true, default: 0 },
//     commentaire: { type: String, required: false, default: '' },
//     idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'boutique', required: true },
//     createdAt: { type: Date, required: true, default: Date.now },
//     deletedAt: { type: Date, required: false, default: null },

export interface Note {
    _id: string;
    idProduit: string;
    idUser: {
        _id: string;
        username: string;
    };
    nombreEtoiles: number;
    commentaire: string;
    idBoutique: string;
    createdAt: Date;
    deletedAt: Date | null;
}