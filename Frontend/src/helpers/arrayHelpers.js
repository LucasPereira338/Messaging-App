
export function pushUniqueIds(uniqueIds, allIds) {
    for (let i = 0; i <= allIds.length - 1; i++) {
        if (!uniqueIds.includes(allIds[i].authorId)) {
          uniqueIds.push(allIds[i].authorId);
        }
        if (!uniqueIds.includes(allIds[i].receiverId)) {
          uniqueIds.push(allIds[i].receiverId);
        }
      }
}