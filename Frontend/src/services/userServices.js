
export async function postNewUser(data) {

    const backend = import.meta.env.BACKEND

    const url = backend + "users"
    
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    return response.json()
    
}

export async function fetchLogin(data) {

    const backend = import.meta.env.VITE_BACKEND

    const url = backend + "users/log-in"

    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    return response.json()
    
}

export async function fetchUser(data) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/" + data.id

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    return response.json()
}

export async function fetchUsersInList(data) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/chats/" + data.data

    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        headers: {'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        }
    })

    return response.json()
}

export async function updateUser(data) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/"

    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        method: "PUT",
        headers: { "Authorization": "Bearer " + token},
        body: data
        
    })

    return response.json()

}