import { IPeople } from "./People/People";

const BASE_URL = "";

export async function getUserData(id:string,pw:string) {
    const promise = await fetch(`${BASE_URL}/coins`);
    const json:IPeople = await promise.json();
    return json;
}