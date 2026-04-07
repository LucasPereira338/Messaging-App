const {prisma} = require('../../lib/prisma.js')

async function getMessage(req, res) {
    const message = await prisma.message.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json(message)
}

async function getAllUserMessages(req, res) {
    const messages = await prisma.message.findMany({
        where: {
            OR: [
                {authorId: req.params.userId},
                {receiverId: req.params.userId}
            ]
        }
    })

    res.json(messages)
}

async function getMessagesByAuthor(req, res) {
    const messages = await prisma.findMany({
        where: {
            authorId: req.params.authorId
        }
    })

    res.json(messages)
}

async function getMessagesByReceiver(req, res) {
    const messages = await prisma.message.findMany({
        where: {
            receiverId: req.params.receiverId
        }
    })

    res.json(messages)
}

async function getAllMessages(req, res) {
    const messages = await prisma.message.findMany()

    res.json(messages)
}

async function postNewMessage(req, res) {
    const message = await prisma.message.create({
        data: {
            content: req.body.content,
            receiverId: req.body.receiverId
        }
    })

    res.json(message)
}

async function updateMessage(req, res) {
    const message = await prisma.message.update({
        where: {
            id: req.body.message
        },
        data: {
            content: req.body.content
        }
    })

    res.json(message)
}

async function deleteAllMessages(req, res) {
    const messages = await prisma.message.deleteMany();

    res.json(messages)
}

async function deleteMessage(req, res) {
    const message = await prisma.message.delete({
        where: {
            id: Number(req.body.id)
        }
    })

    res.json(message)
}

module.exports = {
    getMessage,
    getAllUserMessages,
    getMessagesByAuthor,
    getMessagesByReceiver,
    getAllMessages,
    postNewMessage,
    updateMessage,
    deleteAllMessages,
    deleteMessage
}