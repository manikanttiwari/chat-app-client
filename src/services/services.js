import { postData } from './fetchApi'

export const getMessages = async (payload) => {
    let response = await postData('get-chat-list', payload)
    return response;
}