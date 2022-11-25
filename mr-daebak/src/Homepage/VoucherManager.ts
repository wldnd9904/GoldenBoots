import { atom, useRecoilState } from "recoil";
import { addVoucherAPI, deleteVoucherAPI, editVoucherAPI, getVoucherData, getVoucherListAPI, grantVoucherAPI } from "../api";
import { IVoucher } from "./Voucher";

export default class VoucherManager{
    public static async getVouchers(id:string){
        return await getVoucherData(id);
    }
    public static useVoucher(voucherID:number):void{
        
    }
    public static async grantVoucher(userID:string, voucherID:number){
        return await grantVoucherAPI(userID, voucherID);
    }
    public static async addVoucher(){
        await addVoucherAPI();
    }

    public static async deleteVoucher(voucherID:string){
        await deleteVoucherAPI(voucherID);
    }

    public static async editVoucher(voucherData:IVoucher){
        await editVoucherAPI(voucherData);
    }
    public static async getVoucherList(){
        return await getVoucherListAPI();
    }
}

export const voucherDataAtom = atom<IVoucher[]>({
    key : "voucherData",
    default : undefined,
});
