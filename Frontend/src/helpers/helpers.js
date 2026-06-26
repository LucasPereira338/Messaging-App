import { fetchUserChats, fetchUserPrivateChats, fetchUserGroupChats } from "../services/chatServices";

export async function fetchUserChoices(choice, id) {
    let result;
    switch (choice) {
        case "All":
            result = await fetchUserChats(id)
            break
        case "Online":
        case "Chats":
            result = await fetchUserPrivateChats(id)
            break
        case "Groups":
            result = await fetchUserGroupChats(id)
            break
    }

    return result
}