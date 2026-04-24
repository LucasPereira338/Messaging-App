
export function pushUniqueIds(uniqueIds, allIds) { //except the user currently logged in's
    uniqueIds.push(allIds[0].userId)
    for (let i = 0; i <= allIds.length - 1; i++) {
        if (!uniqueIds.includes(allIds[i].authorId)) {
          uniqueIds.push(allIds[i].authorId);
        }
        if (!uniqueIds.includes(allIds[i].receiverId)) {
          uniqueIds.push(allIds[i].receiverId);
        }
        if (i == allIds.length - 1) {
          uniqueIds.splice(0, 1)
        }
      }
}

export function addUserId(messages, userId) {
  if (typeof messages == 'undefined') {
    return "undefined 'array'"
  }
  for (let i = 0; i <= messages.length - 1; i++) {
        messages[i].userId = userId;
      }
}