
export async function fetchUserMessages(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'messages/user/' + data.id;

    const response = await fetch(url, {
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + data.token
        }
    })
    return response.json()
}

export async function fetchChatMessages(author, receiver) {
    const backend= import.meta.env.VITE_BACKEND;

    const url = backend + "messages/" + author.id + "/chat/" + receiver.id

    const response = await fetch(url, {
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + author.token
        }
    })

    return response.json()
}

export async function postNewMessage(data) {
    const backend= import.meta.env.VITE_BACKEND;

    const url = backend + "messages/"

    const response = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + data.token
        },
        body: JSON.stringify(data)
    })

    return response.json()
}