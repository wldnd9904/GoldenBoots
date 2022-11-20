import { atom } from "recoil";
import { IOrder } from "./Order";

export default class OrderManager{
    public static removeOrder(orderID:string):void{
        
    }
    public static sendOrder(orderID:string):void{
        
    }
    public static editOrder(orderID:string, orderData:IOrder):void{
        
    }
    public static cancelOrder(orderID:string):void{
        
    }
}

export const orderListAtom = atom<IOrder[]>({
    key : "orderList",
    default : [],
});