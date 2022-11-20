import { IDinner, IStyle } from "./Menu";

export interface IOrder extends IDinner, IStyle{
    //CUSTOMER_INF
    userID : string;
    time : string;
    address1 : string;
    address2 : string;
    voucherID : number;
    grillType : string;
};