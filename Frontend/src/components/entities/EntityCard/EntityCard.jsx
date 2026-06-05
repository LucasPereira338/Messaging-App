import * as styles from "./EntityCard.module.css";

function EntityCard({
  entity,
  currentChat = null,
  handleCurrentChat = null,
  msg = null,
}) {
  if (!entity) {
    return (
      <div id={styles.entityCard} data-testid="Loading">
        Loading...
      </div>
    );
  }
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + entity.portrait;
  const name = entity.name != null ? entity.name : entity.title;
  const cardContId = (() => {
    if (entity && !currentChat) {
      return styles.entityCard;
    } else {
      if (entity.id == currentChat.id) {
        return styles.entityCardActive;
      } else {
        return styles.entityCard;
      }
    }
  })();
  return (
    <div
      id={cardContId}
      className="general-borders"
      data-testid="EntityCard"
      onClick={
        handleCurrentChat != null ? () => handleCurrentChat(entity) : null
      }
    >
      <img
        src={portrait}
        alt={!entity ? `portrait of ${entity.name}` : null}
        className={styles.cardPortrait}
      />
      <div className={styles.entityInfo}>
        <div className={styles.cardName}>{name}</div>
        {entity.username != undefined ? (
          <div className={styles.cardUsername}>{entity.username}</div>
        ) : null}

        {msg != null ? (
          <div className={styles.lastMsg} role="msg">
            {msg.content}
          </div>
        ) : null}
      </div>
      {entity.name ? (
        <div
          id={entity.isActive ? styles.onlineCircle : null}
          className={entity != null ? styles.statusCircle : null}
        >
          {" "}
        </div>
      ) : null}
    </div>
  );
}

export default EntityCard;
