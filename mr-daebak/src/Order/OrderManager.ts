import { atom } from "recoil";
import { IOrder } from "./Order";

export default class OrderManager{
    public static addOrder(orderList:IOrder[],order:IOrder):IOrder[]{
        orderList.push(order);
        return orderList;
    }
    public static removeOrder(orderList:IOrder[], orderID:number):IOrder[]{
        orderList.splice(orderID);
        return orderList;
    }
    public static sendOrder(orderID:string):void{
        
    }
    public static editOrder(orderList:IOrder[], orderID:number, orderData:IOrder):IOrder[]{
        orderList[orderID]=orderData;
        return orderList;
    }
    public static cancelOrder(orderID:string):void{
        
    }
}

export const orderListAtom = atom<IOrder[]>({
    key : "orderList",
    default : [],
});