import { atom } from "recoil";

export interface IPeople{
    userID: string;
    password: string;
    email: string;
    name: string;
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
    name: string;
    addressID: number;
    address1: string;
    address2: string;
    userID: string;
}

export interface IAnonymousAddress{
    address1: string;
    address2: string;
    expire: string;
}

