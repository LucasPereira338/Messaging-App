import { createContext } from "react";

export const MessageContext = createContext({ chats: [], currentChat: null, content: 'All'});