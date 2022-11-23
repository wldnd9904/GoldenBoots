import { atom } from "recoil";
import { demoDetailedMenuTypeList, getDetailedMenuTypeListData, getDinnerData, getStyleData } from "../api";
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