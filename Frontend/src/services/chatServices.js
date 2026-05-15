export async function fetchUserChats(user) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + user.id + '/chats' 

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