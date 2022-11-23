import { atom } from "recoil";
import { cancelOrderAPI, editOrderAPI, getRecentOrderAPI, sendOrderAPI } from "../api";
import { IOrder } from "./Order";

export default class OrderManager{
    public static addOrder(orderList:IOrder[],order:IOrder):IOrder[]{ //장바구니에 추가
        orderList.push(order);
        return orderList;
    }
    public static removeOrder(orderList:IOrder[], orderID:number):IOrder[]{ //장바구니에서 제거
        orderList.splice(orderID,1);
        return orderList;
    }
    public static async sendOrder(orderList:IOrder[]){ //주문 전송!
        await sendOrderAPI(orderList);
    }
    public static editOrder(orderList:IOrder[], orderID:number, orderData:IOrder):IOrder[]{ //장바구니에서 변경
        orderList[orderID]=orderData;
        return orderList;
    }
    public static async cancelOrder(orderID:number){ //최근주문내역에서 취소
        return await cancelOrderAPI(orderID);
    }
    public static async getRecentOrder(userID:string){
        return await getRecentOrderAPI(userID);
    }
    public static async editSentOrder(order:IOrder, orderID:number){
        return await editOrderAPI(order, orderID);
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