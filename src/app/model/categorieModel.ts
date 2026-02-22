interface Categorie {
    _id: string;
    nom: string;
    description?: string;
    createdAt: Date;
    deletedAt?: Date | null;
}