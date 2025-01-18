export default interface User {
    id?: string;
    avatar: File | undefined;
    firstName: string;
    lastName: string;
    email: string;
}