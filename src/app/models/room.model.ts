import { User } from "./user.model";

export class Room {
    public id!: string;
    public name!: string;

    public firstUserId!: User;
    public secondUserId!: User;
    //InActive - 0 Active - 1 InProcessing - 2
    public status!: number;
}
