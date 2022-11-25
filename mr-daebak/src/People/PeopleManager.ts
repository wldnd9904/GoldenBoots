import { atom, useRecoilState } from "recoil";
import { addAddressAPI, deleteUserAPI, editUserDataAPI, editUserDataStaffAPI, getAddressData, getUserDataAPI, getUserListDataAPI, getVoucherData, loginAPI, registerAPI, removeAddressAPI } from "../api";
import { IAddress, IPeople, IRegisterForm } from "./People";

export default class PeopleManager{
    /*public static async login(id:string, pw:string): Promise<IPeople>{
        return (id, pw);
    }
*/
    public static logout():void{

    }
    public static async getUserListData(){
        return await getUserListDataAPI();
    }
    public static async login(id:string,pw:string) {
        return await loginAPI(id,pw);
    }
    public static async getUserData(id:string){
        return await getUserDataAPI(id);
    }
    public static async deleteUser(userID:string){
        await deleteUserAPI(userID);
    }
    public static async editUserData(data:IRegisterForm){
        return await editUserDataAPI(data);
    }
    public static async editUserDataStaff(data:IPeople){
        return await editUserDataStaffAPI(data);
    }

    public static async register(data:IRegisterForm){
        return await registerAPI(data);
    }

    public static removeUserData(userID:string):void{

    }
    public static async grantVoucher(userID:string, voucherID:number){
        //TODO
    }
    public static async createVoucher(userID:string, voucherID:number){
        //TODO
    }
    public static async deleteVoucher(userID:string, voucherID:number){
        //TODO
    }
    public static async getVouchers(userID:string){
        return await getVoucherData(userID);
    }
    public static async getAddress(userID:string){
        return await getAddressData(userID);
    }
    public static async addAddress(addressList:IAddress[],data:IAddress){
        addressList.push(data);
        await addAddressAPI(data);
        return addressList;
    }
    public static async removeAddress(addressList:IAddress[],userID:string,index:number){
        let target=-1;
        for(let i=0;i<addressList.length;i++){
            if(addressList[i].addressID==index) target=i;
        }
        if (target==-1) return [];
        addressList.splice(target,1);
        await removeAddressAPI(userID,index);
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
export const userDataListAtom = atom<IPeople[]>({
    key : "userDataList",
    default : [],
});