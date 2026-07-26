const app = require('../../../../app.js')
const request = require('supertest')
const {prisma} = require('../../../../lib/prisma.js')
const jwt = require('../../../utils/jwt/jwt.js');
const bcrypt = require('bcryptjs');

let user;
let secondUser;

beforeAll(async () => {
    const hshdPwd = await bcrypt.hash('12345', 10)
    
    const juan = await prisma.user.create({
        data: {
            name:'Juan',
            username: 'juan32',
            email: 'juan32@gmail.com',
            password: hshdPwd
        }
    })
    
    const peteHshdPwd = await bcrypt.hash('123', 10);
    
    const pete = await prisma.user.create({
        data: {
            name: 'Pete',
            username: 'sneakypete22',
            email: 'sneakypete@gmail.com',
            password: peteHshdPwd
        }
    })

    user = juan
    
    secondUser = pete
    
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

describe("Protected routes", () => {
    const agent = request.agent(app);

    beforeEach(async () => { 
        await agent 
            .post("/users/log-in") 
            .send({ username: 'juan32', password: '12345' }) 
            .expect(200); 
        });

    test("should find a user that matches the search term", async () => {
        await agent
            .get("/users/?name=sneaky")
            .expect(/Pete/)
            .expect(200);
        
    });

    test("should update the user's information", async () => {
        await agent
            .put('/users/' + user.id)
            .type('form')
            .send({
                name: 'Juan Juarez'
            })
            .expect('Content-Type', /json/)
            .expect(/Juan Juarez/)
            .expect(200)
})

    test("should not allow a user to update someone else's information", async () => {
        await agent
            .put('/users/' + secondUser.id)
            .type('form')
            .send({
                name: 'Pete the Fool'
            })
            .expect('Content-Type', /json/)
            .expect(401)
    })

    test("should get the data of a specific user", async () => {
        await agent
            .get('/users/' + user.id)
            .expect('Content-Type', /json/)
            .expect(/Juan/)
            .expect(200)
    })
});

afterAll(async() => {
    await prisma.user.delete({where: {username: 'sneakypete22'}})
    await prisma.user.delete({where: {username: 'john32'}})
    await prisma.user.delete({where: {username: 'juan32'}})
    await prisma.$disconnect()
})  