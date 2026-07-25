const {prisma} = require('../../lib/prisma.js')
const {deleteImg} = require('../utils/cloud/cloud.js')

async function getGroupMessages(req, res) {
    const group = await prisma.group.findUnique({
        where: {
            id: req.params.id
        },
        include: {
            chat: {
                include: {
                    messages: true
                }
            }
        }
    })

    res.json(group)
}

async function getGroupMembers(req, res) {
    const group = await prisma.group.findUnique({
        where: {
            id: req.params.id
        },
        include: {
            chat: {
                include: {
                    members: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    })

    res.json(group)
}

async function getGroup(req, res) {
    
    const group = await prisma.group.findUnique({
        where: {
            id: req.params.id
        },
        include: {
            chat: {
                include: {
                    members: {
                        select: {
                            id: true,
                            name:true,
                            username: true,
                            portrait: true
                        }
                    }
                }
            }
        }
    })

    res.json(group)
}


async function getUserGroups(req, res) {
    const groups = await prisma.group.findMany({
        where: {
            chat: {
                members: {
                    some: {
                        id: req.params.id
                    }
                }
            }
        }
    })

    res.json(groups)
}

async function postGroup(req, res) {
    
     if (typeof req.url !== "undefined") {
        if(req.url != "/") {
            req.body.portrait = req.url
        }
    }

    const users = req.body.users.split(',') 
    users.unshift(req.user.id)
    
    const group = await prisma.group.create({
        data: {
            title: req.body.title,
            portrait: req.body.portrait,
            admin: {
                connect: {
                    id: req.user.id
                }
                
            },
            chat: {
                create: 
                    {
                    members: {
                        connect: users.map(i => ({id: i})) || []
                    }
                }
            },
            
        },
        include: {
            chat: {
                include: {
                    members: true
                }
            }
        }
    })

    res.json(group)
}

async function updateGroup(req, res) {

    const groupAdmin = await prisma.group.findUnique({
        where: {
            id: req.params.id
        },
        select: {
            adminId: true
        }
    })
   
    if(req.user.id != groupAdmin.adminId) {
        return res.status(401).json({message:'unauthorized'})
    }
    
    let oldPort;

    let data = {title: req.body.title, chat: {update: {members: {}}}}

    if (typeof req.imgUrl !== "undefined") {
        req.body.portrait = req.imgUrl
        oldPort = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                portrait: true
            }
        })
    } else {
        delete req.body.portrait
    }
    
    let userAction = {}
   
    let users = []
    if (req.body.users) {
        users = req.body.users.split(",")
        userAction = users.map(i => ({id: i})) || []
        data.chat.update.members.connect = userAction
    }

    let rmvdUsers = []
    if (req.body.rmvdUsers) {
        rmvdUsers = req.body.rmvdUsers.split(",")
        userAction = rmvdUsers.map(i => ({id: i})) || []
        data.chat.update.members.disconnect = userAction
    }
    
    const group = await prisma.group.update({
        where: {
            id: req.params.id
        },
        data: data,
        include: {
            chat: {
                include: {
                    members: true
                }
            }
    }})

    if (oldPort) {
        if (
            oldPort.portrait != group.portrait 
            && oldPort.portrait != "https://res.cloudinary.com/dporccovw/image/upload/v1782995910/blank_cgxyig.svg") {
                await deleteImg(oldPort.portrait)
        }
    }
    
    res.json(group)
}

async function leaveGroup(req, res) { 
    
    const group = await prisma.group.update({
        where: {
            id: req.params.id
        },
        data: {
            chat: {
                update: {
                        members: {
                            disconnect: {id: req.body.user}
                        }
                    }
            }
        }
    })
    
    res.json(group)
}

async function deleteGroup(req, res) {
    
    const groupInfo = await prisma.group.findUnique({
        where: {
            id: req.params.id
        },
        select: {
            adminId: true,
            chatId: true,
            portrait: true
        }
    })
    
    if (req.user.id != groupInfo.adminId) {
        return res.status(401).json({message: 'unauthorized'})
    }

    const chat = await prisma.chat.delete({
        where: {
            id: groupInfo.chatId
        },
        include: {
            group: true
        }
    }) 
    
    if(groupInfo.portrait != "https://res.cloudinary.com/dporccovw/image/upload/v1782995910/blank_cgxyig.svg") {
       
       await deleteImg(groupInfo.portrait)
    }

    res.json(chat.group)
}


module.exports = {
    getGroupMessages,
    getGroupMembers,
    getGroup,
    getUserGroups,
    postGroup,
    updateGroup,
    leaveGroup,
    deleteGroup
}