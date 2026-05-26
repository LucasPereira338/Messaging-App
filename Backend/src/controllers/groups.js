const {prisma} = require('../../lib/prisma.js')

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
                            id: true
                        }
                    },
                    messages: {
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
    console.log(req.file)
    if (typeof req.file !== "undefined") {
        req.body.portrait = req.file.path.slice(7)
    }

    const users = req.body.users.split(',') 
    users.unshift(req.user.id)
    console.log(req.body)
    console.log(users)
    const group = await prisma.group.create({
        data: {
            title: req.body.title,
            portrait: req.body.portrait,
            chat: {
                create: 
                    {
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
        }
    })

    res.json(group)
}

async function putMembersInGroup(req, res) {

    if (typeof req.file !== "undefined") {
        req.body.portrait = req.file.path.slice(7)
    }

    const users = req.body.users
    console.log(users)
    console.log(req.body)
    
    const group = await prisma.group.update({
        where: {
            id: req.params.id
        },
        data: {
            chat: {
                upsert: {
                    create: 
                        {
                        members: {
                            connect: users.map(i => ({id: i})) || []
                        }
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

module.exports = {
    getGroupMessages,
    getGroupMembers,
    getGroup,
    getUserGroups,
    postGroup,
    putMembersInGroup
}