import { useRecoilState } from 'recoil';
import { IPeople, userDataAtom } from "./People/People";

const BASE_URL = "";

export async function getUserData(id:string,pw:string) {
    const [userData, setUserData] = useRecoilState<IPeople>(userDataAtom);
    const data = await fetch(`${BASE_URL}/coins`).then((result) => result.json());
    setUserData(data);
    return true;
}