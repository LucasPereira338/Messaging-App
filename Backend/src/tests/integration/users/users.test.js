const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
//look up the cookies section on the documentation for implementing it later for the jwt tokens
let user;
let secondUser;
let userList = [];

beforeAll(async () => {
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
    secondUser = pete
    userList.push(juan.id)
    userList.push(pete.id)
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

test('get users in an list', done => {
    request(app)
        .get('/users/chats/' +  userList)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test('update specific user info', done => {
    request(app)
        .put('/users')
        .type('form')
        .send({
            id: user.id,
            name: 'Juan Juarez'
        })
        .expect('Content-Type', /json/)
        .expect(/Juan Juarez/)
        .expect(200, done)
})

test('get an user', done => {
    request(app)
        .get('/users/' + user.id)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test('delete an user', done => {
    request(app)
        .delete('/users/')
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