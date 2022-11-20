import { IEvent } from './Event';
import { atom, useRecoilState } from "recoil";
import { getEventData } from '../api';

export default class EventManager{
    public static getEvents(): IEvent[]{
        return getEventData();
    }
}

export const eventDataAtom = atom<IEvent[]>({
    key : "eventData",
    default : undefined,
});
