import { Group } from "./group.interface";

export interface Event{
    id: number,
    name: string,
    info: string,
    duration: number,
    attendance: number,
    date: Date,
    group: Group
}