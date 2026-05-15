
export async function fetchUserContacts(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'messages/user/' + data.id;

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function postNewMessage(data) {
    const backend= import.meta.env.VITE_BACKEND;

    const url = backend + "messages/"

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

export async function deleteMessage(data) {
    const backend= import.meta.env.VITE_BACKEND;

    const url = backend + "messages/" + data.id

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token
        }
    })

    return response.json()
}