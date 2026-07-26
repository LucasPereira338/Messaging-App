const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js');
const bcrypt = require('bcryptjs');

let group;

let user;

let secondUser;

let thirdUser;

beforeAll(async () => {
    const hshdPwd = await bcrypt.hash('12345', 10)
    const john = await prisma.user.create({
        data: {
            name:'john',
            username: 'john3safsafasd2',
            email: 'john3dsadasd2@gmail.com',
            password: hshdPwd
        }
    })
    user = john;

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
})

describe("Protected routes", () => {
    const agent = request.agent(app);

    beforeEach(async () => { 
        await agent 
            .post("/users/log-in") 
            .send({ username: 'john3safsafasd2', password: '12345' }) 
            .expect(200); 
        });

    test("should get all the messages of a group", async () => {
        await agent
            .get('/groups/' + group.id + '/messages')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    test("should get all the members of a group", async () => {
        await agent
            .get('/groups/' + group.id + '/users')
            .expect('Content-Type', /json/)
            .expect(200)
})

    test("should get all the data of a group", async () => {
        await agent
            .get('/groups/' + group.id)
            .expect(/Group 1/)
            .expect('Content-Type', /json/)
            .expect(200)
    })

    test("should get all the groups that a user is part of", async () => {
        await agent
            .get('/users/' + user.id + "/groups")
            .expect('Content-Type', /json/)
            .expect(/Group 1/)
            .expect(200)
    })

    test("should update the information of a group and add new members", async () => {
        await agent
            .put('/groups/' + group.id)
            .type('form')
            .send({title: 'Group 1.0', users: secondUser.id + "," + thirdUser.id})
            .expect(/Group 1.0/)
            .expect(200)
    })
});

afterAll(async () => {
    await prisma.chat.delete({where: {id: group.chatId} })
    await prisma.user.delete({where: {username: 'john3safsafasd2'}})
    await prisma.user.delete({where: {username: 'jaimsdadsadsadase32'}})
    await prisma.user.delete({where: {username: 'jacksondadsadsadase32'}})
    await prisma.$disconnect()
})