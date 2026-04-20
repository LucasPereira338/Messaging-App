
export async function fetchUserMessages(data) {
    const backend = import.meta.env.VITE_BACKEND
    // read up on react context api to properly handle cookies
    const url = backend + 'messages/user/' + data.id;
    console.log(data)
    const testdata = JSON.stringify(data)
    console.log(testdata)
    console.log("testdata above")

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