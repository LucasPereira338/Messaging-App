const {prisma} = require('../../lib/prisma.js')

async function getGroupMessages(req, res) {
    const groupMsgs = await prisma.message.findMany({
        where: {
            groupId: req.params.id
        }
    })

    res.json(groupMsgs)
}

async function getGroupMembers(req, res) {
    const group = await prisma.groupMembers.findMany({
        where: {
            groupId: req.params.id
        },
        select: {
            userId: true
        }
    })

    res.json(group)
}

async function getGroup(req, res) {

    const group = await prisma.group.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json(group)
}


async function getUserGroups(req, res) {
    console.log('searching for groups that ' + req.params.id + " is a part of")
    const groups = await prisma.groupMembers.findMany({
        where: {
            userId: req.params.id
        },
        select: {
            groupId: true
        }
    })

    res.json(groups)
}

async function postGroup(req, res) {

    const group = await prisma.group.create({
        data: {
            title: req.body.title,
            portrait: req.body.portrait,
            users: req.user.id
        }
    })

    res.json(message)
}

async function postMembersToGroup(req, res) {

    const group = await prisma.groupMembers.createMany({
        data: [{groupId: req.params.id, userId: req.body.userId}
            ]
    })
    
    
    res.json(group)
}

module.exports = {
    getGroupMessages,
    getGroupMembers,
    getGroup,
    getUserGroups,
    postGroup,
    postMembersToGroup
}