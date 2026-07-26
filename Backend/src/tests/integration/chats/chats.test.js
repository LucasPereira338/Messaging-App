const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js');
const bcrypt = require('bcryptjs');
let user;

let secondUser;

let message;

let chat;

beforeAll(async () => {
    const hshdPwd = await bcrypt.hash('12345', 10)
    const Thomas = await prisma.user.create({
        data: {
            name:'Thomas',
            username: 'Tom32',
            email: 'Tom32@gmail.com',
            password: hshdPwd
        }
    })

    user = Thomas

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

describe("Protected routes", () => {
    const agent = request.agent(app);

    beforeEach(async () => { 
        await agent 
            .post("/users/log-in") 
            .send({ username: 'Tom32', password: '12345' }) 
            .expect(200); 
        });

    test("should get a chat", async () => {
        await agent
            .get('/chats/' + chat.id)
            .expect('Content-Type', /json/)
            .expect(200);
        
    });

    test("should get all the chats a user is part of", async () => {
        await agent
            .get('/users/' + user.id + '/chats')
            .expect('Content-Type', /json/)
            .expect(200)
    })

    test("should get all the messages in a chat", async () => {
        await agent
            .get('/chats/' + chat.id + '/messages')
            .expect('Content-Type', /json/)
            .expect(200)
    })

    test("should get all the chat members", async () => {
        await agent
            .get('/chats/' + chat.id + '/members')
            .expect('Content-Type', /json/)
            .expect(/hercules/)
            .expect(200)
    })
});


afterAll(async () => {
    await prisma.chat.delete({where: {id: chat.id}})
    await prisma.user.delete({where: {id: secondUser.id}})
    await prisma.user.delete({where: {id: user.id}})
    await prisma.$disconnect()
})