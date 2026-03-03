import { PostModel } from "./postModel";

export interface CommentModel {
    _id?: string;
    idPost: PostModel | string;
    idUser: User | string;
    contenu: string;
    createdAt: Date;
    deletedAt?: Date | null;
    modifiedAt?: Date | null;
}