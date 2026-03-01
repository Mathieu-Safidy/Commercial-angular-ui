export interface LikeModel {
    _id?: string;
    idPost: string;
    idUser: string | User;
    createdAt: Date;
}