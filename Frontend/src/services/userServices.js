
export async function postNewUser(data) {

    data.preventDefault()

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