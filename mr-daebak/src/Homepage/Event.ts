export interface IEvent{
    [index:string]:any;
    eventID?: number;
    name?: string;
    timefrom?: string;
    timeto?: string;
    src_thumbnail?: string;
    src_big?: string;
    voucherID?: number;
};

export class EventClass implements IEvent{
    eventID?: number;
    name?: string;
    timefrom?: string;
    timeto?: string;
    src_thumbnail?: string;
    src_big?: string;
    voucherID?: number;
}