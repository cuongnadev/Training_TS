export default interface User {
    id?: number;
    avatar: File | undefined;
    firstName: string;
    lastName: string;
    email: string;
}