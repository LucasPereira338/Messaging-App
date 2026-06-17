import { createContext } from "react";

export const MessageContext = createContext({ user: null, chats: [], currentChat: null, content: 'All', onlineOnly: false});