
export async function postNewUser(data) {

    const backend = import.meta.env.VITE_BACKEND

    const url = backend + "users"
    
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: data
    });

    return response.json()
    
}

export async function fetchLogin(data) {

    const backend = import.meta.env.VITE_BACKEND

    const url = backend + "users/log-in"

    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    return response.json()
    
}

export async function fetchUsers(data) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/?name=" + data

    const response = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.json()
}

export async function fetchUser(id) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/" + id

    const response = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    })

    return response.json()
}

export async function fetchUsersInList(data) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/list" + data.id 


    const response = await fetch(url, {
        credentials: "include",
        headers: {'Content-Type': 'application/json'
        }
    })

    return response.json()
}

export async function updatePassword(id, data) {
    console.log(id)
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/" + id + "/password"

    const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    return response.json()
}

export async function updateUser(data, id) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/" + id

    const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        body: data
        
    })

    return response.json()
}