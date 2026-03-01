import { PostImageModel } from "./postImageModel";

export interface PostModel {
    _id: string;
    idUser: string | User;
    description: string;
    createdAt: Date;
    deletedAt: Date | null;
    modifiedAt: Date | null;
    images: string[] | PostImageModel[];
}