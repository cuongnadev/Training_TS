import { User } from "../common";

export default interface Admin extends User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}