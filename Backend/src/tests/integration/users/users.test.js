const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js')

let user;
let userToken;
let secondUser;
let userList = [];

beforeAll(async () => {
    
    await prisma.message.deleteMany()
    await prisma.user.deleteMany()
    const juan = await prisma.user.create({
        data: {
            name:'Juan',
            username: 'juan32',
            email: 'juan32@gmail.com',
            password: '12345'
        }
    })
    const pete = await prisma.user.create({
        data: {
            name: 'Pete',
            username: 'sneakypete22',
            email: 'sneakypete@gmail.com',
            password: '12345'
        }
    })

    user = juan
    userToken = jwt.generateAccessToken(user)
    secondUser = pete
    const juanId = juan.id
    const peteId = pete.id
    userList.push(juanId)
    userList.push(peteId)
})

test('post an user', done => {
    request(app)
        .post('/users')
        .type('form')
        .send({
            name:'John',
            username: 'john32',
            email: 'john32@gmail.com',
            password: '12345'
        })
        .expect('Content-Type', /json/)
        .expect(/john32/)
        .expect(200, done)
})

test('get users in a chat', done => {
    request(app)
        .get('/users/chats/' +  userList)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("update user's own info", done => {
    request(app)
        .put('/users')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({
            id: user.id,
            name: 'Juan Juarez'
        })
        .expect('Content-Type', /json/)
        .expect(/Juan Juarez/)
        .expect(200, done)
})

test("user cannot update another user's info", done => {
    request(app)
        .put('/users')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({
            id: secondUser.id,
            name: 'Pete the Fool'
        })
        .expect('Content-Type', /json/)
        .expect(401, done)
})

test('get an user', done => {
    request(app)
        .get('/users/' + user.id)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("user cannot delete someone else's account", done => {
    request(app)
        .delete('/users')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({
            id: secondUser.id
        })
        .expect('Content-Type', /json/)
        .expect(401, done)
})

test("deletes user's own account", done => {
    request(app)
        .delete('/users/')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({
            id: user.id
        })
        .expect('Content-Type', /json/)
        .expect(200, done)
})

afterAll(async() => {
    await prisma.$disconnect()
})  