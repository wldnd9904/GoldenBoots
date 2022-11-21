import { atom } from "recoil";
import { demoDetailedMenuTypeList, getDetailedMenuTypeListData, getDinnerData, getStyleData } from "../api";
import {IDetailedMenuTypeList, IDinner, IStyle } from "./Menu";

export default class MenuManager{
    public static getDinnerList():IDinner[]{
        return getDinnerData();
    }
    public static getStyleList():IStyle[]{
        return getStyleData();
    }
    public static getDetailedMenuTypeList():IDetailedMenuTypeList{
        return getDetailedMenuTypeListData();
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