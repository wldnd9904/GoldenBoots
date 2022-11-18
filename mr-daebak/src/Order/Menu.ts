export interface IDinner {
    dinnerID : number | undefined;
    dinner_name : string | undefined;
    desc : string | undefined;
    src_thumbnail : string | undefined;
    src_big : string | undefined;
    wine? : number | undefined;
    steak? : number | undefined;
    coffee? : number | undefined;
    salad? : number | undefined;
    egg_scramble? : number | undefined;
    bacon? : number | undefined;
    bread? : number | undefined;
    bread_baguette? : number | undefined;
    champagne? : number | undefined;
    cheese? : number | undefined;
    heart_little? : number | undefined;
    cupid? : number | undefined;
    plate_normal? : number | undefined;
    dinner_price? : number | undefined;
};

export interface IStyle{
    styleID: number | undefined;
    style_name : string | undefined;
    plate_box? : number | undefined;
    nepkin_normal? : number | undefined;
    nepkin_white_cotton? : number | undefined;
    nepkin_linen? : number | undefined;
    plate_ceramic? : number | undefined;
    glass_plastic? : number | undefined;
    glass_ceramic? : number | undefined;
    tray_wood? : number | undefined;
    vase_flower? : number | undefined;
    tray_silver? : number | undefined;
    tray_plastic? : number | undefined;
    style_price? : number | undefined;
};

export interface IMenu extends IDinner, IStyle {};

export const menuList:IMenu[] = [
    {
        dinnerID: 1,
        dinner_name: "프렌치 디너",
        desc: "커피 한 잔, 와인 한 잔, 샐러드, 스테이크 제공",
        src_thumbnail:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_thumb.png?raw=true",
        src_big:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_big.png?raw=true",
        wine: 1,
        steak: 1,
        coffee: undefined,
        salad: undefined,
        egg_scramble: undefined,
        bacon: undefined,
        bread: undefined,
        bread_baguette: undefined,
        champagne: undefined,
        cheese: undefined,
        heart_little: 1,
        cupid: 1,
        plate_normal: undefined,
        dinner_price: undefined,
        styleID: undefined,
        style_name: undefined,
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
        style_price: undefined
    },
    {
        dinnerID: 2,
        dinner_name: "발렌타인 디너",
        desc: "커피 한 잔, 와인 한 잔, 샐러드, 스테이크 제공",
        src_thumbnail:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_thumb.png?raw=true",
        src_big:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_big.png?raw=true",
        wine: 1,
        steak: 1,
        coffee: undefined,
        salad: undefined,
        egg_scramble: undefined,
        bacon: undefined,
        bread: undefined,
        bread_baguette: undefined,
        champagne: undefined,
        cheese: undefined,
        heart_little: 1,
        cupid: 1,
        plate_normal: undefined,
        dinner_price: undefined,
        styleID: undefined,
        style_name: undefined,
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
        style_price: undefined
    },
];

export const menuQuantity = [
    { name: '빼기', value: '0' },
    { name: '적게', value: '1' },
    { name: '보통', value: '2' },
    { name: '많이', value: '3' },
];

export interface IDetailedMenuType{
    name: string;
    label: string;
    type: string;
    price: number;
};

export const detailedMenuTypeList:IDetailedMenuType[] = [
    { name: 'wine', label: '와인', type:'C', price: 500},
    { name: 'steak', label: '스테이크', type:'C', price: 500},
    { name: 'coffee', label: '커피', type:'C', price: 500},
    { name: 'salad', label: '샐러드', type:'Q', price: 500},
    { name: 'egg_scramble', label: '에그스크램블', type:'Q', price: 500},
    { name: 'bacon', label: '베이컨', type:'Q', price: 500},
    { name: 'bread', label: '빵', type:'C', price: 500},
    { name: 'bread_baguette', label: '바게트빵', type:'C', price: 500},
    { name: 'champagne', label: '샴페인', type:'C', price: 500},
    { name: 'cheese', label: '치즈', type:'Q', price: 500},
    { name: 'heart_little', label: '작은 하트 장식', type:'B', price: 500},
    { name: 'cupid', label: '큐피드 장식', type:'B', price: 500},
    { name: 'plate_normal', label: '접시', type:'C', price: 500},
    { name: 'plate_box', label: '상자 접시', type:'C', price: 500},
    { name: 'nepkin_normal', label: '냅킨', type:'C', price: 500},
    { name: 'nepkin_white_cotton', label: '흰색 면 냅킨', type:'C', price: 500},
    { name: 'nepkin_linen', label: '린넨 냅킨', type:'C', price: 500},
    { name: 'plate_ceramic', label: '도자기 접시', type:'C', price: 500},
    { name: 'glass_plastic', label: '플라스틱 잔', type:'C', price: 500},
    { name: 'glass_ceramic', label: '도자기 잔', type:'C', price: 500},
    { name: 'tray_wood', label: '나무 쟁반', type:'C', price: 500},
    { name: 'vase_flower', label: '꽃병', type:'C', price: 500},
    { name: 'tray_silver', label: '은 쟁반', type:'C', price: 500},
    { name: 'tray_plastic', label: '플라스틱 쟁반', type:'C', price: 500},
];