const {prisma} = require('../../lib/prisma.js')

async function getMessagesByChat(req, res) {

    if (req.user.id != req.params.authorId && req.user.id != req.params.receiverId) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                    {
                        authorId: req.params.authorId,
                        receiverId: req.params.receiverId
                    },
                    {
                        authorId: req.params.receiverId,
                        receiverId: req.params.authorId
                    }
            ]
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    res.json(messages)
}

async function getMessage(req, res) {
    const message = await prisma.message.findUnique({
        where: {
            id: req.params.id
        }
    })

    if (req.user.id != message.authorId && req.user.id != message.receiverId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    res.json(message)
}

async function getAllUserMessages(req, res) {
    
    if (req.user.id != req.params.userId) {
        return res.status(401).json({message: "Unauthorized"})
    }

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

    if (req.user.id != req.params.authorId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const messages = await prisma.message.findMany({
        where: {
            authorId: req.params.authorId
        }
    })

    res.json(messages)
}

async function getMessagesByReceiver(req, res) {
    console.log(req.user.id)
    console.log(req.params.receiverId)
    if (req.user.id != req.params.receiverId) {
        return res.status(401).json({message: "Unauthorized"})
    }

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

    if (req.user.id != req.body.authorId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const message = await prisma.message.create({
        data: {
            authorId: req.body.authorId,
            content: req.body.content,
            receiverId: req.body.receiverId
        }
    })

    res.json(message)
}

async function updateMessage(req, res) {

    if (req.user.id != req.body.authorId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const message = await prisma.message.update({
        where: {
            id: req.body.id
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

    if (req.user.id != req.body.authorId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const message = await prisma.message.delete({
        where: {
            id: req.body.id
        }
    })

    res.json(message)
}

module.exports = {
    getMessagesByChat,
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