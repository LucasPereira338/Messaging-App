
export async function fetchUserMessages(id) {
    const backend = import.meta.env.VITE_BACKEND
    
    const url = backend + 'user/' + id;

    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(id)
    })

    return response.json()
}