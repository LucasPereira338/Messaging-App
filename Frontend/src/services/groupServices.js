export async function fetchGroupMessages(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + data.id + 'messages';
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function fetchGroupUsers(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + data.id + 'users';
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function fetchGroup(id) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + id
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function fetchUserGroups(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + data + '/groups'
    
    const response = await fetch(url, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}

export async function createGroup(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' 
    
    const response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        body: data
    })
    return response.json()
}

export async function updateGroup(id, data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + id
    
    const response = await fetch(url, {
        method: 'PUT',
        credentials: "include",
        body: data
    })
    return response.json()
}

export async function exitGroup(id, data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + id + '/quit'
    
    const response = await fetch(url, {
        method: 'PUT',
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function deleteGroup(id) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + id 
    
    const response = await fetch(url, {
        method: 'DELETE',
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    return response.json()
}
