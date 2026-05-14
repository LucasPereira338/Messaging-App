const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js')

let user;

let secondUser;

let userToken;

let message;

let chat;

beforeAll(async () => {
    
    const Thomas = await prisma.user.create({
        data: {
            name:'Thomas',
            username: 'Tom32',
            email: 'Tom32@gmail.com',
            password: '12345'
        }
    })

    user = Thomas
    userToken = jwt.generateAccessToken(user)

    const Hercules = await prisma.user.create({
        data: {
            name: 'Hercules',
            username: 'hercules',
            email: 'hercules@gmail.com',
            password: '123'
        }
    })
    secondUser = Hercules
    const chatOne = await prisma.chat.create({
            data: {
                members: {
                    connect: [
                        { id: user.id },
                        { id: secondUser.id }
                    ],
                }
            }})
        
    chat = chatOne

    const messageOne = await prisma.message.create({
            data: {
                authorId: user.id,
                content: "Hey man what's up?",
                chatId: chat.id
            }
        })
    
    message = messageOne
})

test("get's a chat", done => {
    request(app)
        .get('/chats/' + chat.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("get's all the chats a user is part of", done => {
    request(app)
        .get('/users/' + user.id + '/chats')
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("get's all chat messages", done => {
    request(app)
        .get('/chats/' + chat.id + '/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("get's all chat members", done => {
    request(app)
        .get('/chats/' + chat.id + '/users')
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

afterAll(async () => {
    await prisma.chat.delete({where: {id: chat.id}})
    await prisma.user.delete({where: {id: secondUser.id}})
    await prisma.user.delete({where: {id: user.id}})
    await prisma.$disconnect()
})