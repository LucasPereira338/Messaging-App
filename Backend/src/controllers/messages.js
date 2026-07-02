const {prisma} = require('../../lib/prisma.js')
const {deleteImage} = require('../helpers/folders.js');

async function getMessage(req, res) {
    const message = await prisma.message.findUnique({
        where: {
            id: req.params.id
        }
    })

    if (req.user.id != message.authorId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    res.json(message)
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

async function getMessages(req, res) {
    const messages = await prisma.message.findMany({
        where: {
            content: {
                contains: req.query.content
            }
        }
    })

    res.json(messages)
}

async function postNewMessage(req, res) {

    if (req.body.authorId != req.user.id) {
        res.status(401).json({message: 'Unauthorized'})
    }

    if (typeof req.url !== "undefined") {
        req.body.image = req.url
    }

    const message = await prisma.message.create({
        data: {
            authorId: req.body.authorId,
            content: req.body.content,
            image: req.body.image || undefined,
            chatId: req.body.chatId 
        }
    })

    await prisma.chat.update({
        where: {
            id: message.chatId
        },
        data: {
            lastActive: message.createdAt
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
            id: req.params.id
        },
        data: {
            content: req.body.content
        }
    })

    await prisma.chat.update({
        where: {
            id: message.chatId
        },
        data: {
            lastActive: message.updatedAt
        }
    })

    res.json(message)
}

async function deleteAllMessages(req, res) {
    const messages = await prisma.message.deleteMany();

    res.json(messages)
}

async function deleteMessage(req, res) {
    
    const messageId = await prisma.message.findUnique({
        where: {
            id: req.params.id
        },
        select: {
            authorId: true
        }
    })

    if (req.user.id != messageId.authorId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const message = await prisma.message.delete({
        where: {
            id: req.params.id
        }
    })

    if(message.image != null) {
        await deleteImage(message.image)
    }
    
    res.json(message)
}

module.exports = {
    getMessage,
    getMessagesByAuthor,
    getMessages,
    postNewMessage,
    updateMessage,
    deleteAllMessages,
    deleteMessage
}