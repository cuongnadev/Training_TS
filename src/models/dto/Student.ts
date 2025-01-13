import { User } from "../common";

enum Payment {
    Cash,
    Debit,
}

export default interface Student extends User {
    id?: number;
    avatar: string;
    studentCode: string;
    firstName: string;
    lastName: string;
    class: string;
    dob: Date;
    pob: string;
    email: string;
    phone: number;
    address: string;
    parentFirstName: string;
    parentLastName: string;
    parentEmail: string;
    parentPhone: number;
    parentAddress: string;
    payment: Payment;
}