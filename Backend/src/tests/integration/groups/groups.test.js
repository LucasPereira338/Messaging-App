const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js');
const { all } = require('../../../routes/messages.js');

let group;

let user;

let userToken;

let secondUser;

let thirdUser;

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

     const jackson = await prisma.user.create({
        data: {
            name:'jackson',
            username: 'jacksondadsadsadase32',
            email: 'jackson3dddddddddd2@gmail.com',
            password: '12345'
        }
    })
    thirdUser = jackson
    const allUsers = [user.id]
    
    const firstGroup = await prisma.group.create({
        data: {
            title: 'Group 1',
            admin: {
                connect: {
                    id: user.id
                }
                
            },
            chat: {
                create: 
                    {
                    members: {
                        connect: allUsers.map(i => ({id: i})) || []
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
    console.log(group)
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

test("updates a group's information and adds new data", done => {
    request(app)
        .put('/groups/' + group.id)
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({title: 'Group 1.0', users: secondUser.id + "," + thirdUser.id})
        .expect(/Group 1.0/)
        .expect(200, done)
})

afterAll(async () => {
    await prisma.chat.delete({where: {id: group.chatId} })
    await prisma.user.delete({where: {username: 'john3safsafasd2'}})
    await prisma.user.delete({where: {username: 'jaimsdadsadsadase32'}})
    await prisma.user.delete({where: {username: 'jacksondadsadsadase32'}})
    await prisma.$disconnect()
})