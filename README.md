# Messaging Application
This is a full-stack messaging application developed with React(vite), Node.js, Express, PostgreSQL and Prisma ORM.
## Live Project
The project may be viewed here: [Messaging App](https://messaging-app-1-lrou.onrender.com/)

### Mock Users*
- Name: Jonathan Smith, username: jonathan32
- Name: Andre Smith, username: andreas22
#### *These accounts may be interacted with by searching for their name/username in the search bar and clicking on their card in the results

### Platform Support
Please note that this full-stack application is currently **not optimized for mobile devices**. For the optimal experience, please access this application via desktop.

## Features
### Chats
- Private chats
- Group chats
- A new private chat may be started by searching for a existing user in the search bar and clicking on their card
- Chats may be filtered through the sidebar
- Chat messages may be deleted at anytime
### Users
- User registration and login
- User profile management
  - The profile of another user may be viewed by opening a chat with him/her and clicking on their card in the chat.
  - Your own profile may be viewed and/or edited by clicking on your own card
- Persistent login sessions
- JWT authorization
### Groups
- Group creation in the group chats section
- Group information may be viewed by members or edited by the admin by clicking on their card in a open chat.
- Group members may be added or removed by the admin
- Group members who are not the group's admin may leave the group at anytime
- Groups can only be deleted by their administrator
