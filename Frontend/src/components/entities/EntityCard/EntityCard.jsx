import * as styles from "./EntityCard.module.css";

function EntityCard({
  entity,
  currentChat = null,
  handleClick = null,
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
  const members =
    entity.members != null
      ? entity.members
          .map((member) => {
            return member.username;
          })
          .toString()
      : null;

  const isActiveChat = (() => {
    if (entity && currentChat == null) {
      return false;
    } else {
      if (entity.id == currentChat.id) {
        return true;
      } else {
        return false;
      }
    }
  })();
  const cardContId = (() => {
    if (!isActiveChat) {
      return styles.entityCard;
    } else {
      return styles.entityCardActive;
    }
  })();

  return (
    <div
      id={cardContId}
      className="general-borders"
      data-testid="EntityCard"
      onClick={handleClick != null ? () => handleClick(entity) : null}
    >
      <img
        src={portrait}
        alt={!entity ? `portrait of ${entity.name}` : null}
        className={styles.cardPortrait}
      />
      <div className={styles.entityInfo}>
        <div className={styles.cardName}>{name}</div>
        {entity.username != undefined ? (
          <div
            className={
              !isActiveChat ? styles.cardUsername : styles.cardUsernameActive
            }
          >
            {entity.username}
          </div>
        ) : (
          <div
            className={
              !isActiveChat ? styles.cardUsername : styles.cardUsernameActive
            }
          >
            {members}
          </div>
        )}

        {msg != null ? (
          <div className={styles.lastMsg} role="msg">
            {msg.content}
          </div>
        ) : (
          <div className={styles.entityDescription} role="msg">
            {entity.description}
          </div>
        )}
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
