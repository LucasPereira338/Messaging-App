import EntityCard from "../../components/entities/EntityCard/EntityCard";
import ChatBox from "../../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../../components/messages/MessageSidebar/MessageSidebar";
import GroupForm from "../../features/groups/GroupForm/GroupForm";
import PageSidebar from "../../components/navigation/PageSidebar/PageSidebar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { fetchUserChoices } from "../../helpers/helpers";
import { MessageContext } from "../../contexts/MessageContext";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;
  const userId = user.id;

  const [chats, setChats] = useState([{ id: 0 }]);

  const [currentChat, setCurrentChat] = useState({ id: 0 });

  const [content, setContent] = useState("All");

  const handleContent = (choice) => {
    setContent(choice);
  };

  const [isCreateGroup, setIsCreateGroup] = useState(false);

  const handleCreateGroup = () => {
    if (isCreateGroup) {
      setIsCreateGroup(false);
    } else {
      setIsCreateGroup(true);
    }
  };

  let navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchChats = async () => {
        const response = await fetchUserChoices(content, userId);

        setChats(response);
      };
      fetchChats();
    } catch (e) {
      console.error(e);
    }
  }, [userId, content]);

  useEffect(() => {
    if (currentChat.id == user.id) {
      navigate("/profile", { state: user });
    }
  }, [currentChat, navigate, user]);

  const handleCurrentChat = (twData) => {
    const twUserData = twData;

    setCurrentChat(twUserData);
  };

  return (
    <MessageContext value={{ chats, currentChat }}>
      <main className={styles.MessageBoard}>
        <PageSidebar content={content} handleContent={handleContent} />
        <MessageSidebar
          handleCurrentChat={handleCurrentChat}
          handleCreateGroup={handleCreateGroup}
          content={content}
        />
        {isCreateGroup == false ? (
          <ChatBox currentChat={currentChat} />
        ) : (
          <GroupForm />
        )}

        <article id={styles.loggedUser} className="general-borders">
          <EntityCard entity={user} handleCurrentChat={handleCurrentChat} />
        </article>
      </main>
    </MessageContext>
  );
}

export default MessageBoard;
