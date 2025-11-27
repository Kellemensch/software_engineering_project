import type { User } from "./user";

export interface Group {
    title: string;
    accountant: User;
    spending: number;
}
