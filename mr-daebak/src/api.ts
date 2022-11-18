import { IPeople } from "./People/People";

const BASE_URL = "localhost:3000";

export async function getUserData(id:string,pw:string) {
    const promise = await fetch(`${BASE_URL}/dbtest`);
    console.log(await promise.json());
    const json:IPeople = await promise.json();
    return json;
}