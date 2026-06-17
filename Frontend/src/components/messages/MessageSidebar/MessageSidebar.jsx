import * as styles from "./MessageSidebar.module.css";
import { useEffect, useContext } from "react";
import { MessageContext } from "../../../contexts/MessageContext";
import { postNewChat } from "../../../services/chatServices";
import EntityCard from "../../entities/EntityCard/EntityCard";
import SearchUser from "../../../features/users/SearchUser/SearchUser";
import Checkbox from "../../ui/Checkbox/Checkbox";

function MessageSidebar({
  handleCurrentChat,
  handleCreateGroup,
  handleChats,
  handleOnline,
}) {
  const { chats } = useContext(MessageContext);
  const { currentChat } = useContext(MessageContext);
  const { content } = useContext(MessageContext);
  const { onlineOnly } = useContext(MessageContext);

  useEffect(() => {
    if (chats) {
      if (chats.length > 0 && !currentChat) {
        handleCurrentChat(chats[0]);
      }
    }
  });

  const handleNewUser = async (data) => {
    const matchingItem = chats.filter((item) => {
      if (item.id == data.id) {
        return item;
      }
    });
    if (matchingItem.length == 0) {
      const chat = await postNewChat(data);
      data.chatId = chat.id;
      handleChats();
      handleCurrentChat(data);
    } else {
      handleCurrentChat(matchingItem[0]);
    }
  };

  return (
    <section
      id={styles.messagesSidebar}
      className="general-borders"
      data-testid="MessageSidebar"
    >
      <h3 id={styles.messagesSidebarTitle}> Your Messages </h3>
      {content != "Groups" ? (
        <div>
          <SearchUser handleNewUser={handleNewUser} />
          <Checkbox handleToggle={handleOnline} />
        </div>
      ) : (
        <button type="submit" onClick={handleCreateGroup}>
          Create Group
        </button>
      )}

      {!chats ? (
        <div className={styles.MessageSidebarLoading}>Loading Chats...</div>
      ) : (
        <div>
          {chats.length == 0 ? (
            <h5
              className={styles.messageSidebarNoChats}
              data-testid="NoChatHeader"
            >
              {content == "Groups"
                ? "You're not part of any groups yet!"
                : onlineOnly
                  ? "All of your contacts are offline!"
                  : "You don't have any chats yet!"}
            </h5>
          ) : (
            <div>
              <div
                className={styles.sidebarUsersList}
                data-testid="ChatsMembers"
                role="presentation"
              >
                {chats.map((item) => {
                  return (
                    <EntityCard
                      key={item.id}
                      entity={item}
                      currentChat={currentChat}
                      handleClick={handleCurrentChat}
                      msg={item.message}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default MessageSidebar;
