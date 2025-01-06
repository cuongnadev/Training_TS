import { User } from "../common";

export default interface Teacher extends User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
    photo: string;
    dob: Date;
    pob: string;
    university: string;
    degree: string;
    startDate: Date;
    endDate: Date;
    city: string;
}