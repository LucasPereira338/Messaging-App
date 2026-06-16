
export async function postNewUser(data) {

    const backend = import.meta.env.VITE_BACKEND

    const url = backend + "users"
    
    const response = await fetch(url, {
        method: "POST",
        body: data
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

export async function fetchUsers(data) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/?name=" + data

    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json", "Authorization": "Bearer " + token
        }
    })

    return response.json()
}

export async function fetchUser(id) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/" + id

    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json", "Authorization": "Bearer " + token
        }
    })

    return response.json()
}

export async function fetchUsersInList(data) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/list" + data.id 

    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        headers: {'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        }
    })

    return response.json()
}

export async function updatePassword(id, data) {
    console.log(id)
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/" + id + "/password"
    
    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        method: "PUT",
        headers: {'Content-Type': 'application/json',  "Authorization": "Bearer " + token},
        body: JSON.stringify(data)
    })

    return response.json()
}

export async function updateUser(data, id) {
    const backend = import.meta.env.VITE_BACKEND;

    const url = backend + "users/" + id
    
    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        method: "PUT",
        headers: {"Authorization": "Bearer " + token},
        body: data
        
    })

    return response.json()
}