export async function fetchGroupMessages(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + data.id + 'messages';

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function fetchGroupUsers(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + data.id + 'users';

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function fetchGroup(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + data.id 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function fetchUserGroups(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'users/' + data.id + '/groups'

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token
        }
    })
    return response.json()
}

export async function addGroupMembers(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' + data.id 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function createGroup(data) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'groups/' 

    const token = localStorage.getItem('token')
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify(data)
    })
    return response.json()
}

