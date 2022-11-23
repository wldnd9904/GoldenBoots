import axios from "axios";
import { IEvent } from "./Homepage/Event";
import { IVoucher } from "./Homepage/Voucher";
import { IDetailedMenuType, IDetailedMenuTypeList, IDinner, IStyle } from "./Order/Menu";
import { IOrder } from "./Order/Order";
import { IAddress, IPeople, IRegisterForm } from "./People/People";

const BASE_URL = "http://3.39.193.225:3000";


const demoUserData:IPeople={
    userID: "",
    password: "",
    email: "",
    name: "",
    sex: "",
    phone: "",
    birth: "",
    isStaff: false
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
const demoDinners:IDinner[] = [
    {
        dinnerID: 1,
        dinner_name: "프렌치 디너",
        description: "커피 한 잔, 와인 한 잔, 샐러드, 스테이크 제공",
        src_thumbnail:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_thumb.png?raw=true",
        src_big:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_big.png?raw=true",
        wine: 1,
        steak: 1,
        egg_scramble: 2,
        heart_little: 1,
        cupid: 1,
    },
    {
        dinnerID: 2,
        dinner_name: "발렌타인 디너",
        description: "커피 한 잔, 와인 한 잔, 샐러드, 스테이크 제공",
        src_thumbnail:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_thumb.png?raw=true",
        src_big:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_big.png?raw=true",
        wine: 1,
        steak: 1,
        heart_little: 1,
        cupid: 1,
    },
];
export const demoDetailedMenuTypeList:IDetailedMenuTypeList = {
    wine :{ name: 'wine', label: '와인', type:'C', price: 500},
    steak :{ name: 'steak', label: '스테이크', type:'C', price: 500},
    coffee :{ name: 'coffee', label: '커피', type:'C', price: 500},
    salad :{ name: 'salad', label: '샐러드', type:'Q', price: 500},
    egg_scramble :{ name: 'egg_scramble', label: '에그스크램블', type:'Q', price: 500},
    bacon :{ name: 'bacon', label: '베이컨', type:'Q', price: 500},
    bread :{ name: 'bread', label: '빵', type:'C', price: 500},
    bread_baguette :{ name: 'bread_baguette', label: '바게트빵', type:'C', price: 500},
    champagne :{ name: 'champagne', label: '샴페인', type:'C', price: 500},
    cheese :{ name: 'cheese', label: '치즈', type:'Q', price: 500},
    heart_little :{ name: 'heart_little', label: '작은 하트 장식', type:'B', price: 500},
    cupid :{ name: 'cupid', label: '큐피드 장식', type:'B', price: 500},
    plate_normal :{ name: 'plate_normal', label: '접시', type:'C', price: 500},
    plate_box :{ name: 'plate_box', label: '상자 접시', type:'C', price: 500},
    napkin_normal :{ name: 'napkin_normal', label: '냅킨', type:'C', price: 500},
    napkin_white_cotton :{ name: 'napkin_white_cotton', label: '흰색 면 냅킨', type:'C', price: 500},
    napkin_linen :{ name: 'napkin_linen', label: '린넨 냅킨', type:'C', price: 500},
    plate_ceramic :{ name: 'plate_ceramic', label: '도자기 접시', type:'C', price: 500},
    glass_plastic :{ name: 'glass_plastic', label: '플라스틱 잔', type:'C', price: 500},
    glass_ceramic :{ name: 'glass_ceramic', label: '도자기 잔', type:'C', price: 500},
    tray_wood :{ name: 'tray_wood', label: '나무 쟁반', type:'C', price: 500},
    vase_flower :{ name: 'vase_flower', label: '꽃병', type:'C', price: 500},
    tray_silver :{ name: 'tray_silver', label: '은 쟁반', type:'C', price: 500},
    tray_plastic :{ name: 'tray_plastic', label: '플라스틱 쟁반', type:'C', price: 500},
};
const demoStyles:IStyle[] = [
    {
        styleID: 0,
        style_name : "심플 스타일",
        napkin_linen :1, 
        plate_ceramic :1, 
        glass_plastic :1, 
        glass_ceramic :1,
    },
    {
        styleID: 1,
        style_name : "디럭스 스타일",
        plate_box :2, 
        napkin_normal :2, 
        napkin_white_cotton :2, 
        napkin_linen :2, 
        plate_ceramic :2,
    },
];
const demoAddress:IAddress[] = [
    {
      name:"ss",
      addressID:0,
      address1:"뫄뫄",
      address2:"솨솨",
      userID:"sadf"
    },
    {
      name:"gg",
      addressID:1,
      address1:"뫄뫄2",
      address2:"솨솨2",
      userID:"sadf2"
    },
];
const demoRecentOrder:IOrder[]=[
    {
      userID: "sdf",
      orderID:1,
      time: "1986-11-23 11:20",
      address1: "뫄뫄",
      address2: "솨솨",
      voucherID: 0,
      dinnerID: 0,
      dinner_name: "라라",
      description: "sdfdsf",
      src_thumbnail: undefined,
      src_big: undefined,
      wine: undefined,
      steak: undefined,
      coffee: undefined,
      salad: undefined,
      egg_scramble: undefined,
      bacon: undefined,
      bread: undefined,
      bread_baguette: undefined,
      champagne: undefined,
      cheese: undefined,
      heart_little: undefined,
      cupid: undefined,
      plate_normal: undefined,
      dinner_price: undefined,
      styleID: undefined,
      style_name: "팦파",
      plate_box: undefined,
      nepkin_normal: undefined,
      nepkin_white_cotton: undefined,
      nepkin_linen: undefined,
      plate_ceramic: undefined,
      glass_plastic: undefined,
      glass_ceramic: undefined,
      tray_wood: undefined,
      vase_flower: undefined,
      tray_silver: undefined,
      tray_plastic: undefined,
      style_price: undefined,
      grillType : "2",
    },{
      userID: "sdf",
      orderID:2,
      time: "1986-11-23 11:20",
      address1: "뫄뫄",
      address2: "솨솨",
      voucherID: 0,
      dinnerID: 0,
      dinner_name: "라라",
      description: "sdfdsf",
      src_thumbnail: undefined,
      src_big: undefined,
      wine: undefined,
      steak: undefined,
      coffee: undefined,
      salad: undefined,
      egg_scramble: undefined,
      bacon: undefined,
      bread: undefined,
      bread_baguette: undefined,
      champagne: undefined,
      cheese: undefined,
      heart_little: undefined,
      cupid: undefined,
      plate_normal: undefined,
      dinner_price: undefined,
      styleID: undefined,
      style_name: "초차",
      plate_box: undefined,
      nepkin_normal: undefined,
      nepkin_white_cotton: undefined,
      nepkin_linen: undefined,
      plate_ceramic: undefined,
      glass_plastic: undefined,
      glass_ceramic: undefined,
      tray_wood: undefined,
      vase_flower: undefined,
      tray_silver: undefined,
      tray_plastic: undefined,
      style_price: undefined,
      grillType: "3",
    },
];


export async function registerAPI(data:IRegisterForm){
    let message = await axios.post(BASE_URL+"/register",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data.result).catch((error)=>error);
    console.log(data);
    return message;
}
export async function loginAPI(id:string,pw:string){
    const request={userID:id, password:pw};
    let data = await axios.post(BASE_URL+"/login",request,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    if(data.result==="fail") return undefined;
    return data;
}
export async function editUserDataAPI(data:IRegisterForm){
    let message = await axios.post(BASE_URL+"/modified",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data.result).catch((error)=>error);
    console.log(data);
    return message;
}
export async function getEventData() {
    let data = await axios.post(BASE_URL+"/event",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function getVoucherData(id:string) {
    let data = await axios.post(BASE_URL+"/voucher",{userID:id},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function getStyleData() {
    let data = await axios.post(BASE_URL+"/style",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function getDinnerData() {
    let data = await axios.post(BASE_URL+"/dinner",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function getDetailedMenuTypeListData() {
    let data = await axios.post(BASE_URL+"/detail",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function getAddressData(id:string) {
    let data = await axios.post(BASE_URL+"/address2",{userID:id},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function addAddressAPI(addr:IAddress){
    let data = await axios.post(BASE_URL+"/address",{...addr},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function removeAddressAPI(userID:string, addressID:number){
    let data = await axios.post(BASE_URL+"/address3",{userID,addressID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}

export async function getRecentOrderAPI(userID:string){
    let data = await axios.post(BASE_URL+"/recentorder",{userID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}

export async function sendOrderAPI(orderList:IOrder[]){
    let data = await axios.post(BASE_URL+"/order",{orderList},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function editOrderAPI(order:IOrder){
    let data = await axios.post(BASE_URL+"/orderedit",{order},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function cancelOrderAPI(orderID:number){
    let data = await axios.post(BASE_URL+"/ordercancel",{orderID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}