import { IEvent } from './Event';
import { atom, useRecoilState } from "recoil";
import { getEventData } from '../api';

export default class EventManager{
    public static async getEvents(){
        return await getEventData();
    }

    public static addEvent():void{
        
    }

    public static removeEvent(eventID:string):void{
        
    }

    public static editEvent(eventID:string, eventData:IEvent):void{
        
    }
}

export const eventDataAtom = atom<IEvent[]>({
    key : "eventData",
    default : undefined,
});
