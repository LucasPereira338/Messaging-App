import { createContext } from "react";

export const MessageContext = createContext({ chats: [{ id: 0 }], currentChat: null, content: 'All'});