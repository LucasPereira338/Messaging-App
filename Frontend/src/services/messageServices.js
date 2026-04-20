
export async function fetchUserMessages(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'messages/user/' + data.id;

    const response = await fetch(url, {
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + data.token
        }
    })
    return response.json()
}

/*export async function fetchChatMessages(data) {
    const backend= import.meta.env.VITE_BACKEND;

    const url = backend + "users/" + data.authordata + "/chat/" + data.receiverdata
}*/