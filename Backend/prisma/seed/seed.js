const {prisma} = require('../../lib/prisma.js');
const bcrypt = require('bcryptjs')

async function main() {

    const johnPassword = await bcrypt.hash('123', 10);

    const Jonathan = await prisma.user.upsert({
        where: {
            username: 'jonathan32'
        },
        update: {},
        create: {
            name: 'Jonathan Armstrong',
            username: 'jonathan32',
            email: 'jonathan32@gmail.com',
            portrait: 'profiles/portraits/jonathan.jpg',
            password: johnPassword
        }
    })
    
    const bradPassword = await bcrypt.hash('acsdacdsacas', 10);

    const Brad = await prisma.user.upsert({
        where: {
            username: 'brad22'
        },
        update: {},
        create: {
            name: 'Brad Smith',
            username: 'brad22',
            email: 'brad22@gmail.com',
            portrait: 'profiles/portraits/brad.jpg',
            password: bradPassword
        }
    })

    const jasonPassword = await bcrypt.hash('acscacsdsdsdsdssa', 10);

    const Jason = await prisma.user.upsert({
        where: {
            username: 'jasonstewart1'
        },
        update: {},
        create: {
            name: 'Jason Stewart',
            username: 'jasonstewart1',
            email: 'jasonstewart1@gmail.com',
            portrait: 'profiles/portraits/jason.jpg',
            password: jasonPassword
        }
    })

    const chatOne = await prisma.chat.create({
        data: {
            members: {
                connect: [
                    { id: Jonathan.id},
                    { id: Brad.id}
                ],
            }
    }})

    const messageOne = await prisma.message.create({
        data: {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum elementum urna sit amet iaculis. Praesent sed orci quis velit tristique pretium. Morbi nisl nisi, eleifend sed purus sit amet, hendrerit sagittis metus.",
            authorId: Jonathan.id,
            chatId: chatOne.id
        }
    })

    const chatTwo = await prisma.chat.create({
        data: {
            members: {
                connect: [
                    { id: Brad.id},
                    { id: Jonathan.id}
                ],
            }
    }})

    const messageTwo = await prisma.message.create({
        data: {
            content: "Morbi consectetur tellus vestibulum leo suscipit sodales. Praesent eros leo, lacinia et tellus vitae, mattis dignissim libero. Nunc eu sollicitudin mauris.",
            authorId: Brad.id,
            chatId: chatTwo.id
        }
    })

    const chatThree = await prisma.chat.create({
        data: {
            members: {
                connect: [
                    { id: Jason.id},
                    { id: Jonathan.id}
                ],
            }
    }})

    const messageThree = await prisma.message.create({
        data: {
            content: "Mauris quam magna, aliquam quis pulvinar a, feugiat in nisi. Nullam vitae volutpat massa. Pellentesque sodales risus arcu, rhoncus fringilla lectus aliquet at?",
            authorId: Jason.id,
            chatId: chatThree.id
        }
    })

    const group = await prisma.group.create({
        data: {
            title: "Group 1",
            chat: {
                create: 
                    {
                    members: {
                        connect: [{id: Jonathan.id}, {id: Brad.id}, {id: Jason.id}]
                    }
                }
            }
        }
    })

    const messageFour = await prisma.message.create({
        data: {
            content: "Everyone doing alright?",
            authorId: Jason.id,
            chatId: group.chatId
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
