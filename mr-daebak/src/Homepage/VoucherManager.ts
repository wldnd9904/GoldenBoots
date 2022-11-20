import { atom, useRecoilState } from "recoil";
import { getUserData, getVoucherData } from "../api";
import { IVoucher } from "./Voucher";

export default class PeopleManager{
    public static getVouchers(id:string):IVoucher[]{
        return getVoucherData(id);
    }
}

export const voucherDataAtom = atom<IVoucher[]>({
    key : "voucherData",
    default : undefined,
});
