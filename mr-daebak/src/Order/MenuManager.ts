import { atom } from "recoil";
import { IDinner, IStyle } from "./Menu";

export default class MenuManager{
    
}

export const dinnerListAtom = atom<IDinner[]>({
    key : "dinnerList",
    default : [],
});

export const styleListAtom = atom<IStyle[]>({
    key : "dinnerList",
    default : [],
});