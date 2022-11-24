import { atom } from "recoil";
import { getStockAPI, setStockAPI } from "../api";
import { IStock } from "./Stock";

export default class StockManager{
    public static async getStock(){
        return await getStockAPI();
    }
    public static async setStock(name:string,stock:string,price:string){
        return await setStockAPI(name,stock,price);
    }
}

export const stockDataAtom = atom<IStock>({
    key : "stockData",
    default : undefined,
});