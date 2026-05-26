import { createContext } from "react";

export const MessageContext = createContext({ chats: [{ id: 0 }], currentChat: {id: 0}, content: 'All'});