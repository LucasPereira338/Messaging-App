const {prisma} = require('../../lib/prisma.js')

async function getUserChats(req, res) {
    
    const chats = await prisma.chat.findMany({
        where: {
            members: {
                some: {
                    id: req.params.id
                }
            }
        },
        include: {
            group: {
                select: {
                    id: true
                }
            },
            
        }
    })

    res.json(chats)
}

async function getUserPrivateChats(req, res) {
    
    const chats = await prisma.chat.findMany({
        where: {
            AND: {
                members: {
                    some: {
                        id: req.params.id
                    }
                },
                group: null
            }
        }
    })

    const dateNow = new Date()

    res.json(chats)
}

async function getUserGroupChats(req, res) {
    
    const chats = await prisma.chat.findMany({
        where: {
            AND: {
                members: {
                    some: {
                        id: req.params.id
                    }
                },
                group: {
                    isNot: null
                }
            }
        },
        include: {
            group: {
                select: {
                    id: true
                }
            },
            
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
            messages: {
                select: {
                    id: true,
                    authorId: true,
                    content: true,
                    image: true,
                    createdAt: true,
                }, 
                orderBy: {
                    createdAt: 'asc'
                }
            },
            group: true,
            members: {
                select: {
                    id: true,
                    portrait: true
                }
            }
        }
    })

    res.json(chat)
}

async function getChatsMembers(req, res) {
    
    const strList = req.params.ids.split(',')
    const chatUsers = await prisma.chat.findMany({
        where: {
            id: {
                in: strList
            }
        },
        include: {
            members: {
                omit: {
                    password: true
                }
            },
            group: true,
            messages: {
                select: {
                    id: true,
                    content: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        },
    })

    const dateNow = new Date()
    
    chatUsers.forEach((i, ind) => {
        i.members.forEach((item) => {
            const dateDif = dateNow - item.lastActive
            const dateDifConv = dateDif/1000
            if (dateDifConv <= 300) {
            item.isActive = true
            } else {
            item.isActive = false
            }
        })
        
    })

    res.json(chatUsers)
}

async function getChat(req, res) {

    const chat = await prisma.chat.findUnique({
        where: {
            id: req.params.id
        }, 
        include: {
            members: true,
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
    getChatsMembers,
    getUserGroupChats,
    getUserPrivateChats,
    getChatMessages,
    getChat,
    postChat,
}