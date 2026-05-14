const {prisma} = require('../../lib/prisma.js')

async function getUserChats(req, res) {
    
    const chats = await prisma.chat.findMany({
        where: {
            members: {
                some: {
                    id: req.params.id
                }
            }
        }
    })

    res.json(chats)
}

async function getChatMessages(req, res) {
    const chat = await prisma.chat.findMany({
        where: {
            id: req.params.id
        },
        include: {
            messages: true
        }
    })

    res.json(chat)
}

async function getChatMembers(req, res) {
    const chat = await prisma.chat.findMany({
        where: {
            id: req.params.id
        },
        include: {
            members: true
        }
    })


    res.json(chat)
}

async function getChat(req, res) {

    const chat = await prisma.chat.findUnique({
        where: {
            id: req.params.id
        }, 
        include: {
            members: {
                select: {
                    id: true
                }
            },
            messages: true
        }
    })

    res.json(chat)
}


async function postChat(req, res) {

    const chat = await prisma.chat.create({
        data: {
            members: {
                connect: [
                    { id: req.user.id },
                    { id: req.body.id}
                ],
            }
    }})

    res.json(chat)
}

async function deleteChat(req, res) {
    const chat = await prisma.chat.delete({
        where: {
            id: req.params.id
        }
    })

    res.json(chat)
}

module.exports = {
    getUserChats,
    getChatMembers,
    getChatMessages,
    getChat,
    postChat,
}