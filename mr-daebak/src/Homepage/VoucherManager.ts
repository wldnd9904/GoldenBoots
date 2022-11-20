import { atom, useRecoilState } from "recoil";
import { getUserData, getVoucherData } from "../api";
import { IVoucher } from "./Voucher";

export default class VoucherManager{
    public static getVouchers(id:string):IVoucher[]{
        return getVoucherData(id);
    }
    public static useVoucher(voucherID:number):void{
        
    }

    public static addVoucher():void{
        
    }

    public static removeVoucher(voucherID:string):void{
        
    }

    public static editVoucher(voucherID:string, voucherData:IVoucher):void{
        
    }
}

export const voucherDataAtom = atom<IVoucher[]>({
    key : "voucherData",
    default : undefined,
});
