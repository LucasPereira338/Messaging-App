const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js')

let user;
let userToken;

let secondUser;

let message;

beforeAll(async () => {
    await prisma.message.deleteMany()
    await prisma.user.deleteMany()
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
    user = Timmy
    userToken = jwt.generateAccessToken(Timmy)

    secondUser = Tommy
    
    const messageOne = await prisma.message.create({
        data: {
            authorId: user.id,
            content: "Hey man what's up?",
            receiverId: secondUser.id
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
            authorId: secondUser.id,
            receiverId: user.id})
        .expect(/not much dude/)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test('get a existing message', done => {
    request(app)
        .get('/messages/' + message.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})
// must implement sort by dateTime on this still
test('get messages in a chat sorted from newest to oldest', done => {
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
        .expect(/not much dude/)
        .expect(200, done)
})

test('updates a message', done => {
    request(app)
        .put('/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({id: message.id, authorId: user.id, content:'hi mate'})
        .expect('Content-Type', /json/)
        .expect(/hi mate/)
        .expect(200, done)
})

test('deletes a message', done => {
    request(app)
        .delete('/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({id: message.id, authorId: user.id})
        .expect('Content-Type', /json/)
        .expect(/hi mate/)
        .expect(200, done)
})

afterAll(async () => {
    await prisma.$disconnect()
})