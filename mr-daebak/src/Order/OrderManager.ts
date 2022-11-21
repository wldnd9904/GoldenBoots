import { atom } from "recoil";
import { getRecentOrderAPI } from "../api";
import { IOrder } from "./Order";

export default class OrderManager{
    public static addOrder(orderList:IOrder[],order:IOrder):IOrder[]{
        orderList.push(order);
        return orderList;
    }
    public static removeOrder(orderList:IOrder[], orderID:number):IOrder[]{
        orderList.splice(orderID,1);
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
    public static getRecentOrder():IOrder[]{
        return getRecentOrderAPI();
    }
}

export const orderListAtom = atom<IOrder[]>({
    key : "orderList",
    default : [],
});

export const recentOrderAtom = atom<IOrder[]>({
    key : "recentOrderList",
    default : [],
});