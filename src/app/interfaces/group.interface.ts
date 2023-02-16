import { UserGroup } from "./user.interface";

export interface Group {
    name: string,
    description: string,
    participants: UserGroup[]
}