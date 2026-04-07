const {prisma} = require('../../lib/prisma.js')

async function getUser(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json(user)
}

async function getUsersInList(req, res) {

    const strList = req.params.usersIds.split(',')
    
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: strList
            }
        }
    })

    res.json(users)
}

async function getAllUsers(req, res) {
    const users = await prisma.user.findMany()

    res.json(users)
}

async function postNewUser(req, res) {
    const users = await prisma.user.create({
        data: {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            portrait: req.body.portrait
        }
    })

    res.json(users)
}

async function updateUser(req, res) {
    const user = await prisma.user.update({
        where: {
            id: req.body.id
        },
        data: {
            ...req.body
        }
    })

    res.json(user)
}

async function deleteAllUsers(req, res) {
    const users = await prisma.user.deleteMany()

    res.json(users)
}

async function deleteUser(req, res) {
    const user = await prisma.user.delete({
        where: {
            id: req.body.id
        }
    })
    
    res.json(user)
}

module.exports = {
    getUser,
    getUsersInList,
    getAllUsers,
    postNewUser,
    updateUser,
    deleteAllUsers,
    deleteUser
}