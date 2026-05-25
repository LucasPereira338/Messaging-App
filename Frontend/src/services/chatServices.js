export async function fetchUserChats(ids) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + ids + '/chats' 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function postNewChat(user) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'chats/'

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(user)
    })
    return response.json()
}

export async function fetchChatMessages(chat) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'chats/' + chat + '/messages' 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function fetchChatsMembers(chats) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'chats/' + chats + '/members' 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function fetchUserPrivateChats(id) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + id + '/chats/private' 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function fetchUserGroupChats(id) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + id + '/chats/groups' 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function fetchChatsUsers(chats) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'chats/' + chats + '/users' 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + token
        }
    })
    return response.json()
}