import { atom } from "recoil";
import { IOrder } from "./Order";

export default class OrderManager{

}

export const orderListAtom = atom<IOrder[]>({
    key : "orderList",
    default : [],
});