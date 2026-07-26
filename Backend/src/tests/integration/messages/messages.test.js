const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js');
const bcrypt = require('bcryptjs');

let user;

let secondUser;

let thirdUser;

let message;

let userMsg;

let chat;

beforeAll(async () => {
    const hshdPwd = await bcrypt.hash('12345', 10)
    const Timmy = await prisma.user.create({
        data: {
            name:'Timmy',
            username: 'Timmy32',
            email: 'Timmy32@gmail.com',
            password: hshdPwd
        }
    })
    const Tommy = await prisma.user.create({
        data: {
            name: 'Tommy',
            username: 'sneakyTommy22',
            email: 'sneakyTommy@gmail.com',
            password: '12345'
        }
    })
    const Thad = await prisma.user.create({
        data: {
            name: 'Thad',
            username: 'thad123',
            email: 'thad@gmail.com',
            password: 'dasdasdoia'
        }
    })
    user = Timmy
    

    secondUser = Tommy
    
    thirdUser = Thad

    const chatOne = await prisma.chat.create({
        data: {
            members: {
                connect: [
                    { id: user.id }
                ],
            }
        }})
    
    chat = chatOne
    
    const messageOne = await prisma.message.create({
        data: {
            authorId: secondUser.id,
            content: "Hey man what's up?",
            chatId: chat.id
        }
    })

    message = messageOne

    const messageTwo = await prisma.message.create({
        data: {
            authorId: user.id,
            content: "hi dude",
            chatId: chat.id
        }
    })
    
    userMsg = messageTwo
})

describe("Protected routes", () => {
    const agent = request.agent(app);

    beforeEach(async () => { 
        await agent 
            .post("/users/log-in") 
            .send({ username: 'Timmy32', password: '12345' }) 
            .expect(200); 
        });

    test("should post a new message in a existing chat", async () => {
        await agent
            .post('/messages')
            .type('form')
            .send({
                content: 'not much dude',
                authorId: user.id,
                chatId: chat.id})
            .expect(/not much dude/)
            .expect('Content-Type', /json/)
            .expect(200)
            
    });

    test("should prevent a user from sending a message on someone else's behalf", async () => {
        await agent
            .post('/messages')
            .type('form')
            .send({
                content: 'not much dude',
                authorId: thirdUser.id,
                chatId: chat.id})
            .expect('Content-Type', /json/)
            .expect(401)
})

    test("should get a existing message", async () => {
        await agent
            .get('/messages/' + userMsg.id)
            .expect('Content-Type', /json/)
            .expect(/hi dude/)
            .expect(200)
    })

    test("should get all the messages sent by the a specific user", async () => {
        await agent
            .get('/messages/author/' + user.id)
            .expect('Content-Type', /json/)
            .expect(200)
    })

    test("should prevent a user from deleting someone else's message", async () => {
        await agent
            .delete('/messages/' + message.id)
            .expect('Content-Type', /json/)
            .expect(401)
    })

    test("should delete a message", async () => {
        await agent
            .delete('/messages/' + userMsg.id)
            .expect('Content-Type', /json/)
            .expect(200)
    })

});

afterAll(async () => {
    await prisma.chat.delete({where: {id: chat.id}})
    await prisma.user.delete({where: {id: user.id}})
    await prisma.user.delete({where: {id: secondUser.id}})
    await prisma.user.delete({where: {id: thirdUser.id}})
    await prisma.$disconnect()
}) 