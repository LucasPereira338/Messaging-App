const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js')

let user;
let userToken;

let secondUser;
let secondUserToken;

let thirdUser;

let message;

beforeAll(async () => {
    
    const Timmy = await prisma.user.create({
        data: {
            name:'Timmy',
            username: 'Timmy32',
            email: 'Timmy32@gmail.com',
            password: '12345'
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
    userToken = jwt.generateAccessToken(Timmy)

    secondUser = Tommy
    secondUserToken = jwt.generateAccessToken(Tommy)
    thirdUser = Thad
    
    const messageOne = await prisma.message.create({
        data: {
            authorId: secondUser.id,
            content: "Hey man what's up?",
            receiverId: user.id
        }
    })
    
    message = messageOne
})

test('post a new message', done => {
    request(app)
        .post('/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({
            content: 'not much dude',
            authorId: user.id,
            receiverId: secondUser.id})
        .expect(/not much dude/)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("user cannot send a message on behalf of someone else", done => {
    request(app)
        .post('/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({
            content: 'not much dude',
            authorId: thirdUser.id,
            receiverId: secondUser.id})
        .expect('Content-Type', /json/)
        .expect(401, done)
})

test('get a existing message', done => {
    request(app)
        .get('/messages/' + message.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test('get messages in a chat', done => {
    request(app)
        .get(`/messages/${user.id}/chat/${secondUser.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test('gets all the messages of a user', done => {
    request(app)
        .get('/messages/user/' + user.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("user cannot view someone else's messages", done => {
    request(app) 
        .get('/messages/user/' + secondUser.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(401, done)
})

test('gets all the messages that a user sent', done => {
    request(app)
        .get('/messages/author/' + user.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test('gets all the messages that a user received', done => {
    request(app)
        .get('/messages/receiver/' + user.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(/Hey man what's up?/)
        .expect(200, done)
})

test('updates a message', done => {
    request(app)
        .put('/messages/' + message.id)
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({authorId: user.id, content:'hi mate'})
        .expect('Content-Type', /json/)
        .expect(/hi mate/)
        .expect(200, done)
})

test("user cannot change someone else's message", done => {
    request(app)
        .put('/messages/' + message.id)
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({authorId: secondUser.id, content:'i hate you'})
        .expect('Content-Type', /json/)
        .expect(401, done)
})

test("user cannot delete someone else's message", done => {
    request(app)
        .delete('/messages/' + message.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(401, done)
})

test('deletes a message', done => {
    request(app)
        .delete('/messages/' + message.id)
        .set('Authorization', `Bearer ${secondUserToken}`)
        .expect('Content-Type', /json/)
        .expect(/hi mate/)
        .expect(200, done)
})



afterAll(async () => {
    await prisma.user.delete({where: {id: user.id}})
    await prisma.user.delete({where: {id: secondUser.id}})
    await prisma.user.delete({where: {id: thirdUser.id}})
    await prisma.$disconnect()
})