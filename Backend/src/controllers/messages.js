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

async function getAllUserChatPartners(req, res) {
    
    if (req.user.id != req.params.userId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                {authorId: req.params.userId},
                {receiverId: req.params.userId}
            ]
        },
        orderBy: {
            updatedAt: "desc"
        },
        select: {
            authorId: true,
            receiverId: true
        }
    })

    /*
    const messages = await prisma.message.findMany({
        where: {
            OR: [
                {authorId: req.params.userId},
                {receiverId: req.params.userId}
            ]
        },
        orderBy: {
            updatedAt: "desc"
        },
        select: {
            authorId: true,
            receiverId: true
        } 
    })
    */

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

    if (req.user.id != req.body.authorId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    if (typeof req.file !== "undefined") {
        req.body.image = req.file.path.slice(7)
    }

    const message = await prisma.message.create({
        data: {
            authorId: req.body.authorId,
            content: req.body.content,
            image: req.body.image || undefined,
            receiverId: req.body.receiverId || undefined,
            groupId: req.body.groupId || undefined
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
    
    res.json(message)
}

module.exports = {
    getMessagesByChat,
    getMessage,
    getAllUserChatPartners,
    getMessagesByAuthor,
    getMessagesByReceiver,
    getMessages,
    postNewMessage,
    updateMessage,
    deleteAllMessages,
    deleteMessage
}