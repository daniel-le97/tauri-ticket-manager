import { useDB } from "./index.js";
export type User = {
    name: string,
    age: number
}
class DBService {
    async getUsers(){
        return (await useDB()).select<User>(`SELECT * from users`)
    }
}


export const dbService = new DBService()