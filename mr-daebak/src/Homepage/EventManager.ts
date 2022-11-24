import { IEvent } from './Event';
import { atom, useRecoilState } from "recoil";
import { addEventAPI, deleteEventAPI, editEventAPI, getEventData } from '../api';

export default class EventManager{
    public static async getEvents(){
        return await getEventData();
    }
    public static async addEvent(){
        await addEventAPI();
    }
    public static async deleteEvent(eventID:string){
        await deleteEventAPI(eventID);
    }
    public static async editEvent(eventData:IEvent){
        await editEventAPI(eventData);
    }
}

export const eventDataAtom = atom<IEvent[]>({
    key : "eventData",
    default : undefined,
});
