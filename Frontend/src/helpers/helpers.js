import { fetchUserChats, fetchUserChatsUsersOnly, fetchUserChatsGroupsOnly } from "../services/chatServices";
export async function fetchUserChoices(choice, id) {
    let result;
    if (choice == "All") {
        result = await fetchUserChats(id)
    } else if (choice == "Chats") {
        result = await fetchUserChatsUsersOnly(id)
    } else if (choice == "Groups") {
        result = await fetchUserChatsGroupsOnly(id)
    }

    return result
}