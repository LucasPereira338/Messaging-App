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

    const group = await prisma.group.create({
        data: {
            title: req.body.title,
            portrait: req.body.portrait,
            chat: {
                create: 
                    {
                    members: {
                        connect: [{id: req.user.id}, {id: req.body.id}]
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

    const group = await prisma.group.update({
        where: {
            id: req.params.id
        },
        data: {
            chat: {
                create: 
                    {
                    members: {
                        connect: [{id: req.body.id}]
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