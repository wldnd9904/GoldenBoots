import { atom, useRecoilState } from "recoil";
import { getUserData, registerAPI } from "../api";
import { IPeople, IRegisterForm } from "./People";

export default class PeopleManager{
    public static async login(id:string, pw:string): Promise<IPeople>{
        return getUserData(id, pw);
    }

    public static logout():void{

    }

    public static editUserData():void{

    }

    public static register(data:IRegisterForm):void{
        registerAPI(data);
    }

    public static removeUserData(userID:string):void{

    }
}

export const userDataAtom = atom<IPeople>({
    key : "userData",
    default : undefined,
});
