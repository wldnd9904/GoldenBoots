import { atom } from "recoil";
import { IStock } from "./Stock";

export default class StockManager{
    
}

export const stockDataAtom = atom<IStock>({
    key : "stockData",
    default : undefined,
});