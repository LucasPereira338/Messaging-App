const {prisma} = require('../../lib/prisma.js')
const jwt = require('../utils/jwt/jwt.js')
const bcrypt = require('bcryptjs')

async function getUser(req, res) {
    
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            description: true,
            portrait: true
        }
    })

    if(typeof user.description != 'string') {
        user.description = ''
    }

    res.json(user)
}

async function getUsersInList(req, res) {
    const strList = req.params.usersIds.split(',')

    const users = await prisma.user.findMany({
        take: 5,
        where: {
            id: {
                in: strList
            }
        },
        select: {
            id: true,
            name: true,
            username: true,
            portrait: true,
            lastActive: true
        },
        orderBy: {
            name: "asc"
        }
    })

    const dateNow = new Date()
    
    users.forEach((item, ind) => {
        const dateDif = dateNow - item.lastActive
        const dateDifConv = dateDif/1000
        if (dateDifConv <= 3000) {
            item.isActive = true
        } else {
            item.isActive = false
        }
    })
    
    res.json(users)
}

async function getUsers(req, res) {
    
    const searchTerm = req.query.name

    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: searchTerm
                }},
                 {
                    username: {
                        contains: searchTerm
                }}, 
                {
                    email: {
                        contains: searchTerm
                }}
            ],
        },
        omit: {
                password: true
            }
    })
    
    const dateNow = new Date()
    
    users.forEach((item, ind) => {
        const dateDif = dateNow - item.lastActive
        const dateDifConv = dateDif/1000
        if (dateDifConv <= 300) {
            item.isActive = true
        } else {
            item.isActive = false
        }
    })

    res.json(users)
}

async function postLogin(req, res) {

    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        },
        select: {
            id: true,
            name: true,
            username: true,
            portrait: true,
            password: true
        }
    })

    if (!user) {
        return res.json({message: "no users with that username exist"})
    } 

    const match = await bcrypt.compare(req.body.password, user.password)
    
    if (!match) {
        return res.json({message: "wrong password"})
    }

    delete user.password

    token = jwt.generateAccessToken(user)

    user.token = token
    
    res.json(user)


}

async function postNewUser(req, res) {

    if (typeof req.file !== "undefined") {
        req.body.portrait = req.file.path.slice(7)
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            portrait: req.body.portrait
        },
        select: {
            id: true,
            name: true,
            username: true,
            portrait: true
        }
    })

    user.token = jwt.generateAccessToken(user)

    res.json(user)
}

async function updateUser(req, res) {

    if (typeof req.file !== "undefined") {
        req.body.portrait = req.file.path.slice(7)
    }
    
    if (req.user.id != req.params.id) {
        return res.status(401).json({message:"unauthorized"})
    }
    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            ...req.body
        },
        omit: {
            password: true
        }
    })

    res.json(user)
}

async function deleteAllUsers(req, res) {
    const users = await prisma.user.deleteMany()

    res.json(users)
}

async function deleteUser(req, res) {
    if (req.user.id != req.params.id) {
        return res.status(401).json({message:"unauthorized"})
    }
    const user = await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    
    res.json(user)
}

module.exports = {
    getUser,
    getUsersInList,
    getUsers,
    postLogin,
    postNewUser,
    updateUser,
    deleteAllUsers,
    deleteUser
}