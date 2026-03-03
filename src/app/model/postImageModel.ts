import { PostModel } from "./postModel";

export interface PostImageModel {
    _id: string;
    link: string;
    idPost: string | PostModel;
    createdAt: Date;
    deletedAt: Date | null;
    modifiedAt: Date | null;
}
