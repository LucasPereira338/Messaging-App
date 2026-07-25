export async function fetchUserChats(ids) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + ids + '/chats' 
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function postNewChat(user) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'chats/'
    
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
    return response.json()
}

export async function fetchChatMessages(chat) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'chats/' + chat + '/messages' 
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function fetchChatsMembers(chats) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'chats/' + chats + '/members' 
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function fetchUserPrivateChats(id) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + id + '/chats/private' 
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function fetchUserGroupChats(id) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + id + '/chats/groups' 
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function fetchChatsUsers(chats) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'chats/' + chats + '/users' 
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}