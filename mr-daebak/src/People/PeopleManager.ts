import { atom, useRecoilState } from "recoil";
import { getAddressData, getUserDataAPI, registerAPI } from "../api";
import { IAddress, IPeople, IRegisterForm } from "./People";

export default class PeopleManager{
    /*public static async login(id:string, pw:string): Promise<IPeople>{
        return (id, pw);
    }
*/
    public static logout():void{

    }
    public static getUserData():IPeople {
        return getUserDataAPI();
    }
    public static editUserData():void{

    }

    public static register(data:IRegisterForm):void{
        registerAPI(data);
    }

    public static removeUserData(userID:string):void{

    }
    
    public static getAddress():IAddress[]{
        return getAddressData();
    }
    public static addAddress(addressList:IAddress[],data:IAddress):IAddress[]{
        addressList.push(data);
        return addressList;
    }
    public static removeAddress(addressList:IAddress[],index:number):IAddress[]{
        addressList.splice(index,1);
        return addressList;
    }
}

export const userDataAtom = atom<IPeople>({
    key : "userData",
    default : undefined,
});
export const addressDataAtom = atom<IAddress[]>({
    key : "addressData",
    default : [],
});
