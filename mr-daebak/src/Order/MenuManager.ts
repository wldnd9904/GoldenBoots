import { atom } from "recoil";
import { addDinnerAPI, addStyleAPI, deleteDinnerAPI, deleteStyleAPI, demoDetailedMenuTypeList, editDinnerAPI, editStyleAPI, getDetailedMenuTypeListData, getDinnerData, getStyleData } from "../api";
import {IDetailedMenuTypeList, IDinner, IStyle } from "./Menu";

export default class MenuManager{
    public static async getDinnerList(){
        return await getDinnerData();
    }
    public static async getStyleList(){
        return await getStyleData();
    }
    public static async getDetailedMenuTypeList(){
        return await getDetailedMenuTypeListData();
    }
    public static async deleteDinner(dinnerID:string){
        return await deleteDinnerAPI(dinnerID);
    }
    public static async editDinner(data:IDinner){
        return await editDinnerAPI(data);
    }
    public static async addDinner(){
        return await addDinnerAPI();
    }
    public static async deleteStyle(styleID:string){
        return await deleteStyleAPI(styleID);
    }
    public static async editStyle(data:IStyle){
        return await editStyleAPI(data);
    }
    public static async addStyle(){
        return await addStyleAPI();
    }
}

export const dinnerListAtom = atom<IDinner[]>({
    key : "dinnerList",
    default : [],
});

export const styleListAtom = atom<IStyle[]>({
    key : "styleList",
    default : [],
});

export const detailListAtom = atom<IDetailedMenuTypeList>({
    key : "detailList",
    default : demoDetailedMenuTypeList,
});