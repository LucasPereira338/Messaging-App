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
            title: 'first group ever'
        }
    })

    const firstGroupMembers = await prisma.groupMembers.create({
            
        data: {
            groupId: firstGroup.id,
            userId: user.id
        }
    })
    group = firstGroup
})

test('add a user to group', done => {
    request(app)
        .post('/groups/' + group.id)
        .set('Authorization', `Bearer ${userToken}`)
        .type('form')
        .send({userId: secondUser.id })
        
        .expect(200, done)
})

test('get a existing group', done => {
    request(app)
        .get('/groups/' + group.id)
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})


test('get all groups a user is a member of', done => {
    request(app)
        .get('/users/' + user.id + '/groups/')
        .set('Authorization', `Bearer ${userToken}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
})






afterAll(async () => {
    await prisma.group.delete({where: {id: group.id} })
    await prisma.user.delete({where: {username: 'john3safsafasd2'}})
    await prisma.user.delete({where: {username: 'jaimsdadsadsadase32'}})
    await prisma.$disconnect()
})