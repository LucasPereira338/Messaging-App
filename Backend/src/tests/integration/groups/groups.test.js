const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js')

let group;

let user;

let userToken;

let secondUser;

beforeAll(async () => {
    
    const john = await prisma.user.create({
        data: {
            name:'john',
            username: 'john3safsafasd2',
            email: 'john3dsadasd2@gmail.com',
            password: '12345'
        }
    })
    user = john;
    userToken = jwt.generateAccessToken(john)
    const jaime = await prisma.user.create({
        data: {
            name:'jaime',
            username: 'jaimsdadsadsadase32',
            email: 'jaime3dddddddddd2@gmail.com',
            password: '12345'
        }
    })
    secondUser = jaime;

    const firstGroup = await prisma.group.create({
        data: {
            title: 'Group 1',
            chat: {
                create: 
                    {
                    members: {
                        connect: [{id: user.id}]
                    }
                }
            }
        },
        include: {
            chat: {
                include: {
                    members: true
                }
            }
        }
    })

    group = firstGroup
})

test("get's a group's messages", done => {
    request(app)
        .get('/groups/' + group.id + '/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})


test("get's a group's members", done => {
    request(app)
        .get('/groups/' + group.id + '/users')
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("get's a group", done => {
    request(app)
        .get('/groups/' + group.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(/Group 1/)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("get's all groups a user is part of", done => {
    request(app)
        .get('/users/' + user.id + "/groups")
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})

test("add's new members to a group", done => {
    request(app)
        .put('/groups/' + group.id)
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({id: secondUser.id})
        .expect('Content-Type', /json/)
        .expect(200, done)
})




afterAll(async () => {
    await prisma.chat.delete({where: {id: group.chatId} })
    await prisma.user.delete({where: {username: 'john3safsafasd2'}})
    await prisma.user.delete({where: {username: 'jaimsdadsadsadase32'}})
    
    await prisma.$disconnect()
})