const {prisma} = require('../../lib/prisma.js')
const jwt = require('../utils/jwt/jwt.js')
const bcrypt = require('bcryptjs')
const {deleteImg} = require('../utils/cloud/cloud.js')


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
            portrait: true,
            lastActive: true
        }
    })
    
    if(user && user.description == null) {
        user.description = ''
    }

    const dateNow = new Date()
    
    
    const dateDif = dateNow - user.lastActive
    const dateDifConv = dateDif/1000
    if (dateDifConv <= 300) {
        user.isActive = true
    } else {
        user.isActive = false
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
            name: "desc"
        }
    })
    
    res.json(users)
}

async function getUsers(req, res) {
    
    const searchTerm = req.query.name
    
    const users = await prisma.user.findMany({
        where: {
            AND: {
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
                NOT: {
                    id: req.user.id
                }
            }
            
        },
        select: {
                id: true,
                name: true,
                username: true,
                portrait: true,
                lastActive: true
            },
        
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

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{
                username: {equals: req.body.username}
            }, {
                email: {equals: req.body.email}
            }]
        },
        select: {
            username: true,
            email: true
        }
    })
    if (existingUser) {
        if (req.body.username == existingUser.username) {
            return res.json({message: "That username is taken"})
        } else {
            return res.json({message: "That email address is taken"})
        }
        
    }
    
    if (typeof req.url !== "undefined") {
        if(req.url != "/") {
            req.body.portrait = req.url
        }
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            description: req.body.description,
            password: hashedPassword,
            portrait: req.body.portrait || undefined
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

async function updateUserPassword(req, res) {

    if (req.user.id != req.params.id) {
        return res.status(401).json({message:"unauthorized"})
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id
        },
        select: {
            id: true,
            password: true
        }
    })

    const match = await bcrypt.compare(req.body.oldPassword, user.password)

    if (!match) {
        return res.json({message: "the current password field is incorrect"})
    } 

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    const pwdChange = await prisma.user.update({
        where: {
            id: req.params.id
        }, 
        data: {
            password: hashedPassword
        }
    })

    res.status(200).json({message: "Password successfully changed!"})

}

async function updateUser(req, res) {
    
    if (typeof req.url !== "undefined") {
        req.body.portrait = req.url
        const oldPort = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                portrait: true
            }
        })
        
        if (oldPort.portrait != "https://res.cloudinary.com/dporccovw/image/upload/v1782995910/blank_cgxyig.svg") {
            await deleteImg(oldPort.portrait)
        }
        
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
            password: true,
            createdAt: true,
            updatedAt: true,
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
    updateUserPassword,
    updateUser,
    deleteAllUsers,
    deleteUser
}