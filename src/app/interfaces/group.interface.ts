import { Event } from "./event.interface";
import { User } from "./user.interface";

export interface Group {
    id:          number;
    name:        string;
    description: string;
    events:      Event[];
    usersGroup:  UsersGroup[];
}

export interface UsersGroup {
    user:  User;
    group: number;
}

export interface GroupDto {
    id:number,
    name: string,
    description: string
}