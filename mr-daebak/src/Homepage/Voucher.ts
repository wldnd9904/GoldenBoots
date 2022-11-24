export interface IVoucher{
    [index:string]:any;
    voucherID?: number;
    voucherName?: string;
    price?: number;
    expire?: string;
};

export class VoucherClass implements IVoucher{
    voucherID?: number;
    voucherName?: string;
    price?: number;
    expire?: string;
}