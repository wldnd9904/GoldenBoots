import { atom } from "recoil";

export interface IPeople{
    userID: number;
    password: string;
    email: string;
    name: number;
    sex: string;
    phone: string;
    birth: string;
    isStaff: boolean;
};

export interface ICustomer extends IPeople{};

export interface IStaff extends IPeople{
    staffID: number;
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

export const userDataAtom = atom({
    key : "userData",
    default : false,
});