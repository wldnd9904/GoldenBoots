export interface IDinner {
    [index:string]:any;
    dinnerID : number | undefined;
    dinner_name : string | undefined;
    description : string | undefined;
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
    [index:string]:any;
    styleID: number | undefined;
    style_name : string | undefined;
    plate_box? : number | undefined;
    napkin_normal? : number | undefined;
    napkin_white_cotton? : number | undefined;
    napkin_linen? : number | undefined;
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

export interface IDetailedMenuType{
    name: string;
    label: string;
    type: string;
    price: number;
};

export interface IDetailedMenuTypeList{
[index:string]:IDetailedMenuType;
wine : IDetailedMenuType;
steak : IDetailedMenuType;
coffee : IDetailedMenuType;
salad : IDetailedMenuType;
egg_scramble : IDetailedMenuType;
bacon : IDetailedMenuType;
bread : IDetailedMenuType;
bread_baguette : IDetailedMenuType;
champagne : IDetailedMenuType;
cheese : IDetailedMenuType;
heart_little : IDetailedMenuType;
cupid : IDetailedMenuType;
plate_normal : IDetailedMenuType;
plate_box : IDetailedMenuType;
napkin_normal : IDetailedMenuType;
napkin_white_cotton : IDetailedMenuType;
napkin_linen : IDetailedMenuType;
plate_ceramic : IDetailedMenuType;
glass_plastic : IDetailedMenuType;
glass_ceramic : IDetailedMenuType;
tray_wood : IDetailedMenuType;
vase_flower : IDetailedMenuType;
tray_silver : IDetailedMenuType;
tray_plastic : IDetailedMenuType;
}

export class DinnerClass implements IDinner{
    [index: string]: any;
    dinnerID: number | undefined;
    dinner_name: string | undefined;
    description: string | undefined;
    src_thumbnail: string | undefined;
    src_big: string | undefined;
    wine?: number | undefined;
    steak?: number | undefined;
    coffee?: number | undefined;
    salad?: number | undefined;
    egg_scramble?: number | undefined;
    bacon?: number | undefined;
    bread?: number | undefined;
    bread_baguette?: number | undefined;
    champagne?: number | undefined;
    cheese?: number | undefined;
    heart_little?: number | undefined;
    cupid?: number | undefined;
    plate_normal?: number | undefined;
};

export class StyleClass implements IStyle{
    [index: string]: any;
    styleID: number | undefined;
    style_name: string | undefined;
    plate_box?: number | undefined;
    napkin_normal?: number | undefined;
    napkin_white_cotton?: number | undefined;
    napkin_linen?: number | undefined;
    plate_ceramic?: number | undefined;
    glass_plastic?: number | undefined;
    glass_ceramic?: number | undefined;
    tray_wood?: number | undefined;
    vase_flower?: number | undefined;
    tray_silver?: number | undefined;
    tray_plastic?: number | undefined;
    style_price?: number | undefined;
}
