
export async function fetchUserContacts(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'messages/user/' + data.id;
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"
        }
    })
    return response.json()
}

export async function postNewMessage(data) {
    const backend= import.meta.env.VITE_BACKEND;

    const url = backend + "messages/"
    
    const response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        body: data
    })
    
    return response.json()
}

export async function deleteMessage(data) {
    const backend= import.meta.env.VITE_BACKEND;

    const url = backend + "messages/" + data.id

    const response = await fetch(url, {
        method: 'DELETE',
        credentials: "include",
        headers: {"Content-Type": "application/json"
        }
    })

    return response.json()
}