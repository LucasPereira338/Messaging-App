const {prisma} = require('../../lib/prisma.js')

async function getAllChats(req, res) {
    const chats = await prisma.chat.findMany()

    console.log(chats)

    res.json(chats)
}

async function getUserOrGroupChats(req, res) {
    const chats = await prisma.chat.findMany({
        include: {
            chats: true
        }
    })

    console.log(chats)

    res.json(chats)
}

async function getChatMessages(req, res) {
    const chat = await prisma.chat.findMany({
        include: {
            messages: true
        }
    })

    console.log(chat)

    res.json(chat)
}

async function getChatMembers(req, res) {
    const chat = await prisma.chat.findMany({
        include: {
            members: true
        }
    })

    console.log(chat)

    res.json(chat)
}

async function getChat(req, res) {

    const group = await prisma.group.findUnique({
        where: {
            id: req.params.id
        }, 
        include: {
            members: true,
            messages: true
        }
    })

    res.json(group)
}


async function postChat(req, res) {

    const chat = await prisma.chat.create({
        data: {
            members: {
                connect: [
                    { id: req.user.id }
                ],
            }
    }})

    console.log(chat)

    res.json(chat)
}

module.exports = {
    getAllChats,
    getUserOrGroupChats,
    getChatMembers,
    getChatMessages,
    getChat,
    postChat,
}