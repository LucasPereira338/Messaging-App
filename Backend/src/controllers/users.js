const {prisma} = require('../../lib/prisma.js')
const jwt = require('../utils/jwt/jwt.js')
const bcrypt = require('bcryptjs')

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

async function postLogin(req, res) {

    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (!user) {
        return res.json({message: "no users with that username exist"})
    } 

    const match = await bcrypt.compare(req.body.password, user.password)
    
    if (!match) {
        return res.json({message: "wrong password"})
    }
    user.token = jwt.generateAccessToken(user)
    
    res.json(user)


}

async function postNewUser(req, res) {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const users = await prisma.user.create({
        data: {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            portrait: req.body.portrait
        }
    })

    res.json(users)
}

async function updateUser(req, res) {
    
    if (req.user.id != req.body.id) {
        return res.status(401).json({message:"unauthorized"})
    }
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
    console.log(req.user)
    if (req.user.id != req.body.id) {
        return res.status(401).json({message:"unauthorized"})
    }
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
    postLogin,
    postNewUser,
    updateUser,
    deleteAllUsers,
    deleteUser
}