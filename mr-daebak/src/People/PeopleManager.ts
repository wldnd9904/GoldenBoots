import { atom, useRecoilState } from "recoil";
import { getUserData } from "../api";
import { IPeople } from "./People";

export default class PeopleManager{
    public static async login(id:string, pw:string): Promise<IPeople>{
        return getUserData(id, pw);
    }
}

export const userDataAtom = atom<IPeople>({
    key : "userData",
    default : undefined,
});
