const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')

test('post an user', done => {
    request(app)
        .post('/users')
        .type('form')
        .send({
            name:'Juan',
            username: 'juan32',
            email: 'juan32@gmail.com',
            password: '12345'
        })
        .expect(200, done)
})

afterAll(async() => {
    await prisma.$disconnect()
})  