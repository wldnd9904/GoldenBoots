import { IDinner, IStyle } from "./Menu";

export interface IOrder extends IDinner, IStyle{
    //CUSTOMER_INF
    [index:string]:any;
    userID? : string;
    phone? : string;
    orderID? : number;
    time? : string;
    address1? : string;
    address2? : string;
    voucherID? : number;
    grillType? : string;
};

export class OrderClass implements IOrder{
    userID?: string;
    phone?: string;
    orderID?: number;
    time?: string;
    address1?: string;
    address2?: string;
    voucherID?: number;
    grillType?: string;
    dinnerID: number | undefined;
    dinner_name: string | undefined;
    description: string | undefined;
    src_thumbnail: string | undefined;
    src_big: string | undefined;
    wine?: number | undefined;
    steak?: number | undefined;
    coffee?: number | undefined;
    salad?: number | undefined;
    egg_scramble?: number | undefined;
    bacon?: number | undefined;
    bread?: number | undefined;
    bread_baguette?: number | undefined;
    champagne?: number | undefined;
    cheese?: number | undefined;
    heart_little?: number | undefined;
    cupid?: number | undefined;
    plate_normal?: number | undefined;
    dinner_price?: number | undefined;
    styleID: number | undefined;
    style_name: string | undefined;
    plate_box?: number | undefined;
    napkin_normal?: number | undefined;
    napkin_white_cotton?: number | undefined;
    napkin_linen?: number | undefined;
    plate_ceramic?: number | undefined;
    glass_plastic?: number | undefined;
    glass_ceramic?: number | undefined;
    tray_wood?: number | undefined;
    vase_flower?: number | undefined;
    tray_silver?: number | undefined;
    tray_plastic?: number | undefined;
    style_price?: number | undefined;
    
}