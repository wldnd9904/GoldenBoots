export interface IMenu{
    ID:number,
    src_thumb: string;
    src_big: string;
    name: string;
    desc: string;
    price: number;
    salad:boolean; 
    steak:boolean; 
    egg_scramble:boolean; 
    bacon:boolean; 
    bread:boolean; 
    bread_baguette:boolean; 
    coffee:boolean; 
    wine:boolean; 
    champagne:boolean; 
    box_plate:boolean; 
    nepkin_normal:boolean; 
    heart_little:boolean; 
    cupid:boolean; 
    plate_normal:boolean; 
    tray_plastic:boolean; 
    glass_plastic:boolean; 
    plate_ceramic:boolean; 
    glass_ceramic:boolean; 
    nepkin_white_cotton:boolean; 
    tray_wood:boolean; 
    vase_flower:boolean; 
    nepkin_linen:boolean;
}

export interface IOrder{
    customerID: number;
    menuID: number;
    time: number;
    address: string;
    salad:number; 
    steak:number; 
    egg_scramble:number; 
    bacon:number; 
    bread:number; 
    bread_baguette:number; 
    coffee:number; 
    wine:number; 
    champagne:number; 
    box_plate:number; 
    nepkin_normal:number; 
    heart_little:number; 
    cupid:number; 
    plate_normal:number; 
    tray_plastic:number; 
    glass_plastic:number; 
    plate_ceramic:number; 
    glass_ceramic:number; 
    nepkin_white_cotton:number; 
    tray_wood:number; 
    vase_flower:number; 
    nepkin_linen:number;
};

