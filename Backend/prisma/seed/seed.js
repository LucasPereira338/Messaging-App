const {prisma} = require('../../lib/prisma.js');

async function main() {

    const Jonathan = await prisma.user.upsert({
        where: {
            username: 'jonathan32'
        },
        update: {},
        create: {
            name: 'Jonathan Armstrong',
            username: 'jonathan32',
            email: 'jonathan32@gmail.com',
            portrait: '/home/lucas/StudyProjects/NodeProjects/Messaging-App/Backend/assets/profiles/portraits/jonathan.jpg',
            password: 'safpocmajopcacpm'
        }
    })

    const Brad = await prisma.user.upsert({
        where: {
            username: 'brad22'
        },
        update: {},
        create: {
            name: 'Brad Smith',
            username: 'brad22',
            email: 'brad22@gmail.com',
            portrait: '/home/lucas/StudyProjects/NodeProjects/Messaging-App/Backend/assets/profiles/portraits/brad.jpg',
            password: 'acsdacdsacas'
        }
    })

    const Jason = await prisma.user.upsert({
        where: {
            username: 'jasonstewart1'
        },
        update: {},
        create: {
            name: 'Jason Stewart',
            username: 'jasonstewart1',
            email: 'jasonstewart1@gmail.com',
            portrait: '/home/lucas/StudyProjects/NodeProjects/Messaging-App/Backend/assets/profiles/portraits/jason.jpg',
            password: 'acscacsdsdsdsdssa'
        }
    })

    const messageOne = await prisma.message.create({
        data: {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum elementum urna sit amet iaculis. Praesent sed orci quis velit tristique pretium. Morbi nisl nisi, eleifend sed purus sit amet, hendrerit sagittis metus.",
            authorId: Jonathan.id,
            receiverId: Brad.id
        }
    })

    const messageTwo = await prisma.message.create({
        data: {
            content: "Morbi consectetur tellus vestibulum leo suscipit sodales. Praesent eros leo, lacinia et tellus vitae, mattis dignissim libero. Nunc eu sollicitudin mauris.",
            authorId: Brad.id,
            receiverId: Jonathan.id
        }
    })

    const messageThree = await prisma.message.create({
        data: {
            content: "Mauris quam magna, aliquam quis pulvinar a, feugiat in nisi. Nullam vitae volutpat massa. Pellentesque sodales risus arcu, rhoncus fringilla lectus aliquet at?",
            authorId: Jason.id,
            receiverId: Jonathan.id
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1)
    })
