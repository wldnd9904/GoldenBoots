import { IEvent } from "./Homepage/Event";
import { IVoucher } from "./Homepage/Voucher";
import { IPeople } from "./People/People";

const BASE_URL = "localhost:3000";

export async function getUserData(id:string,pw:string) {
    const promise = await fetch(`${BASE_URL}/dbtest`);
    console.log(await promise.json());
    const json:IPeople = await promise.json();
    return json;
}

const demoEvents:IEvent[] =[    {   
    eventID: 1,
    name: "이벤트",
    from: "2020-02-02",
    to: "2020-02-03",
    src_thumbnail: "https://cdn.dominos.co.kr/admin/upload/event/20221108_lj4LAFLa.png",
    src_big: "https://cdn.dominos.co.kr/renewal2018/w/event/221112_doubleUp/img.jpg",
    voucherID: -1,
},
{   
    eventID: 2,
    name: "이벤트",
    from: "2020-02-02",
    to: "2020-02-03",
    src_thumbnail: "https://cdn.dominos.co.kr/admin/upload/event/20221101_WUe2aN3t.jpg",
    src_big: "http://cdn.dominos.co.kr/renewal2018/w/event/221004_wildWestSteak/img.jpg",
    voucherID: -1,
},
{   
    eventID: 3,
    name: "이벤트",
    from: "2020-02-02",
    to: "2020-02-03",
    src_thumbnail: "https://cdn.dominos.co.kr/admin/upload/event/20221108_lj4LAFLa.png",
    src_big: "https://cdn.dominos.co.kr/renewal2018/w/event/221112_doubleUp/img.jpg",
    voucherID: -1,
},
];

const demoVouchers:IVoucher[] = [
    {   
        voucherID: 0,
        voucherName: "웰컴 3000원 할인 쿠폰",
        price: 3000,
        expire: "2022-12-28",
    },
    {   
        voucherID: 0,
        voucherName: "벡만원 할인 쿠폰",
        price: 1000000,
        expire: "2022-12-28",
    },
    {   
        voucherID: 0,
        voucherName: "4달러",
        price: 5360,
        expire: "2030-12-28",
    },
];

export function getEventData():IEvent[] {
    return demoEvents;
}
export function getVoucherData(userid:string):IVoucher[] {
    return demoVouchers;
}