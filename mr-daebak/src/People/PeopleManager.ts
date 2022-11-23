import { atom, useRecoilState } from "recoil";
import { getAddressData, getUserDataAPI, loginAPI, registerAPI } from "../api";
import { IAddress, IPeople, IRegisterForm } from "./People";

export default class PeopleManager{
    /*public static async login(id:string, pw:string): Promise<IPeople>{
        return (id, pw);
    }
*/
    public static logout():void{

    }
    public static async getUserData(id:string,pw:string) {
        return await loginAPI(id,pw);
    }
    public static editUserData():void{

    }

    public static async register(data:IRegisterForm){
        return await registerAPI(data);
    }

    public static removeUserData(userID:string):void{

    }
    
    public static async getAddress(userID:string){
        return getAddressData(userID);
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
