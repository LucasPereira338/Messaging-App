
export function pushUniqueIds(uniqueIds, allIds) { //except the user currently logged in's
    for (let i = 0; i <= allIds.length - 1; i++) {
        if (!uniqueIds.includes(allIds[i].authorId)) {
          uniqueIds.push(allIds[i].authorId);
        }
        if (!uniqueIds.includes(allIds[i].receiverId)) {
          uniqueIds.push(allIds[i].receiverId);
        }
      }
}

export function addUserId(messages, userId) {
  for (let i = 0; i <= messages.length - 1; i++) {
        messages[i].userId = userId;
      }
}