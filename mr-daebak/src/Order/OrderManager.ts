import { atom } from "recoil";
import { alterOrderStateAPI, cancelOrderAPI, editOrderAPI, getPendingOrderAPI, getRecentOrderAPI, sendOrderAPI } from "../api";
import { IDetailedMenuTypeList, IDinner, IStyle } from "./Menu";
import { IOrder } from "./Order";

export default class OrderManager{
    static textToOrder(transcript: string, dinnerList: IDinner[], styleList: IStyle[], detailList: IDetailedMenuTypeList, userID:string, phone:string, address1:string, address2:string, time:string):IOrder[] {
      let ret:IOrder[]=[];
      const dinnerNameList:string[] = dinnerList.map(dinner=>dinner.dinner_name?.split(" ")[0] as string);
      const dinnerDictionary:{[index:string]:IDinner} = {};
      dinnerList.forEach(dinner=>dinnerDictionary[dinner.dinner_name?.split(" ")[0] as string]=dinner);
      const styleNameList:string[] = styleList.map(style=>style.style_name?.split(" ")[0] as string);
      const styleDictionary:{[index:string]:IStyle} = {};
      styleList.forEach(style => styleDictionary[style.style_name?.split(" ")[0] as string]=style);
      const detailNameList:string[] = [];
      const detailDictionary:{[index:string]:string} = {};
      Object.keys(detailList).forEach(key=>{
        detailNameList.push(detailList[key].label);
        detailDictionary[detailList[key].label]=key;
      });
      const words=transcript.split(" ");
      let from = 0, to = words.length;
      while(from!=to){
        let tmpOrder:IOrder={};
        //디너이름 찾기 & 주문 범위 설정
        let gotDinner:boolean=false;
        for(let i = from;i<to;i++){
            for(let dnName in dinnerNameList){
            if(dinnerNameList[dnName]!=""&&words[i].includes(dinnerNameList[dnName])){
                if(gotDinner){
                    to=i;break;
                }else{
                    from=i;
                    gotDinner=true;
                    Object.keys(dinnerDictionary[words[i]]).forEach(key=>{
                        if(dinnerDictionary[words[i]][key]==0||dinnerDictionary[words[i]][key])tmpOrder[key]=dinnerDictionary[words[i]][key];
                    })
                }
            }};
        }
        //디너설정완료 => 스타일이름 찾기
        let gotStyle:boolean=false;
        for(let i = from;i<to;i++){
            styleNameList.forEach(stName =>{
            if(stName!=""&&words[i].includes(stName)){
                if(!gotStyle){
                    gotStyle=true;
                    Object.keys(styleDictionary[stName]).forEach(key=>{
                        if(styleDictionary[stName][key]==0||styleDictionary[stName][key])tmpOrder[key]=styleDictionary[stName][key];
                    })
                }
            }});
        }
        //스타일설정완료 => 상세메뉴설정 적용
        for(let i = from;i<to;i++){ //모든 단어에 대해 
            for(let dtName in detailNameList){ //디테일 이름 검사하는데
                let dtFound:boolean = false;
                let nameArr = dtName.split(" "); //디테일 이름이 여러 단어일 수도 있어서
                if(words[i].includes(detailNameList[dtName].replace(" ",""))){dtFound=true;}
                for(let dtNameIdx=0; dtNameIdx< nameArr.length; dtNameIdx++){ //디테일 이름
                    if(words[i]!=nameArr[dtNameIdx])break; //여러 단어끼리 매칭
                    if(dtNameIdx==nameArr.length-1)dtFound=true; //모든 단어 매칭됐으면 찾은것.
                }
                if(dtFound && tmpOrder[detailDictionary[detailNameList[dtName]]]){
                    let qt=-1;
                    for(let j=i+nameArr.length;j<to;j++){
                        if(qt!=-1)break;
                        switch(words[j]){
                            case "0개":
                            case "0개":
                            case "영":
                            case "영개":qt=0;break;
                            case "1":
                            case "1개":
                            case "하나":
                            case "한개":
                            case "한":qt=1;break;
                            case "2":
                            case "2개":
                            case "둘":
                            case "두":
                            case "두개":qt=2;break;
                            case "3":
                            case "3개":
                            case "셋":
                            case "세":
                            case "세개":qt=3;break;
                            case "4":
                            case "4개":
                            case "넷":
                            case "네개":
                            case "네":qt=4;break;
                            case "5":
                            case "5개":
                            case "다섯":
                            case "다섯개":qt=5;break;
                        }
                        if(qt!=-1)break;
                        if(words[j].includes("빼")||words[j].includes("없")){qt=0;break;}
                        if(words[j].includes("적당")||words[j].includes("보통")){qt=2;break;}
                        if(words[j].includes("적")||words[j].includes("조금")){qt=1;break;}
                        if(words[j].includes("많")){qt=3;break;}
                    }
                    if(qt!=-1) tmpOrder[detailDictionary[detailNameList[dtName]]]=qt;
                }
            }
        }
        //상세메뉴설정완료 => 마지막으로 고기 굽기
        let grillTypeFound=false;
        for(let i=from;i<to;i++){
            if(grillTypeFound)break;
            if(words[i].includes("미디움")){
                if(words[i].includes("레어")||words[i+1]&&words[i+1].includes("레어"))tmpOrder.grillType="1";
                else if(words[i].includes("웰던")||words[i+1]&&words[i+1].includes("웰던"))tmpOrder.grillType="3";
                else tmpOrder.grillType="2";
                grillTypeFound=true;
            }
            else if(words[i].includes("레어")){
                tmpOrder.grillType="0";
                grillTypeFound=true;
            }else if(words[i].includes("웰던")){
                tmpOrder.grillType="4";
                grillTypeFound=true;
            }
        }
        if(!grillTypeFound)tmpOrder.grillType="2";
        tmpOrder.address1=address1;
        tmpOrder.address2=address2;
        tmpOrder.userID=userID;
        tmpOrder.time=time;
        if(tmpOrder.dinnerID!=null&&tmpOrder.dinnerID!=undefined&&tmpOrder.styleID!=null&&tmpOrder.styleID!=undefined)ret.push(tmpOrder);
        from=to;
        to=words.length;
      }
      return ret;
    }
    public static addOrder(orderList:IOrder[],order:IOrder):IOrder[]{ //장바구니에 추가
        orderList.push(order);
        return orderList;
    }
    public static removeOrder(orderList:IOrder[], orderID:number):IOrder[]{ //장바구니에서 제거
        orderList.splice(orderID,1);
        return orderList;
    }
    public static async sendOrder(orderList:IOrder[]){ //주문 전송!
        return await sendOrderAPI(orderList);
    }
    public static editOrder(orderList:IOrder[], orderID:number, orderData:IOrder):IOrder[]{ //장바구니에서 변경
        orderList[orderID]=orderData;
        return orderList;
    }
    public static async cancelOrder(orderID:number){ //최근주문내역에서 취소
        return await cancelOrderAPI(orderID);
    }
    public static async getRecentOrder(userID:string){
        return await getRecentOrderAPI(userID);
    }
    public static async editSentOrder(order:IOrder){
        return await editOrderAPI(order);
    }
    public static async getPendingOrder(){
        return await getPendingOrderAPI();
    }
    public static async alterOrderState(orderID:number,state:string){
        return await alterOrderStateAPI(orderID,state);
    }
    public static getDefaultTime():string {
        const time = new Date();
        let returnTime:string = "";
        if (time.getHours() < 10) {
          returnTime += "0";
        }
        returnTime += time.getHours() + ":";
        if (time.getMinutes() < 10) {
          returnTime += "0";
        }
        returnTime += time.getMinutes();
        return returnTime;
      }
}

export const orderListAtom = atom<IOrder[]>({
    key : "orderList",
    default : [],
});

export const recentOrderAtom = atom<IOrder[]>({
    key : "recentOrderList",
    default : [],
});

export const pendingOrderListAtom = atom<IOrder[]>({
    key : "pendingOrderList",
    default: []
});
