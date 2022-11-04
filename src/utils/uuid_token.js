import { v4 as uuidv4 } from 'uuid'
export const getUUID = () => {
    //生成一个随机字符串，每次执行不变化，游客身份持久存储
    //先从本地存储中获取
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN', uuid_token)
            //生成游客临时身份
    }
    return uuid_token
}