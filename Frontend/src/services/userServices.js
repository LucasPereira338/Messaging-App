
export async function postNewUser(data) {

    const backend = import.meta.env.BACKEND

    const url = backend + "users"
    
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data
    });
    
    const result = await response.json()

    return result.json()
    
}

export async function fetchLogin(data) {

    const backend = import.meta.env.BACKEND

    const url = backend + "users/log-in"
    
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data
    });
    
    const result = await response.json()

    return result.json()
    
}