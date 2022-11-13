export interface IPeople{
    userID: number;
    password: string;
    email: string;
    name: number;
    sex: string;
    birth: string;
    isStaff: boolean;
};

export interface IAddress{
    address1: string;
    address2: string;
    userID: number;
}

export interface IAnonymousAddress{
    address1: string;
    address2: string;
    expire: string;
}