const { response } = require('express')
const {prisma} = require('../../lib/prisma.js')
const {deleteImage} = require('../helpers/folders.js')

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
    
    if (typeof req.file !== "undefined") {
        req.body.portrait = req.file.path.slice(7)
        
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
    
    let users = req.body.users 
    if (!Array.isArray(users)) {
        users = [users]
    }
    console.log(users)
    const group = await prisma.group.update({
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title || undefined,
            portrait: req.body.portrait || undefined,
            chat: {
                update: {
                        members: {
                            connect: users.map(i => ({id: i})) || []
                        }
                    }
            }
        },
        include: {
            chat: {
                include: {
                    members: true
                }
            }
    }})
    
    res.json(group)
}

async function removeGroupMembers(req, res) {
    
    let users = req.body.users 
    if (!Array.isArray(users)) {
        users = [users]
    }
    
    const group = await prisma.group.update({
        where: {
            id: req.params.id
        },
        data: {
            chat: {
                update: {
                        members: {
                            disconnect: users.map(i => ({id: i})) || []
                        }
                    }
            }
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

async function deleteGroup(req, res) {
    const group = await prisma.group.delete({
        where: {
            id: req.params.id
        }
    })

    res.json(group)
}


module.exports = {
    getGroupMessages,
    getGroupMembers,
    getGroup,
    getUserGroups,
    postGroup,
    updateGroup,
    removeGroupMembers,
    deleteGroup
}