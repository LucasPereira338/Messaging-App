
export function pushUniqueIdsAndChatId(uniqueIds, allIds) { 
  const userId = localStorage.getItem("userId");
  
  allIds.forEach((item) => {
    
    if (item.group != null) {
      item.group.chatId = item.id;
      item.group.message = item.messages[0];
      item.group.members = item.members
      uniqueIds.push(item.group);
    } else {
        for (let i = 0; i <= item.members.length - 1; i++) {
          item.members[i].chatId = item.id
          item.members[i].message = item.messages[0]
          const doesArrHaveUser = uniqueIds.some(user => user.id === item.members[i].id)
          
          if (item.members[i].id != userId) {
            if (doesArrHaveUser == false) {
              uniqueIds.push(item.members[i]);
            }
          }
        }
    }
    
  });
}

export function arrayObjToStr(oldArr) {
  let newArr = []
  for (let i =0; i<=oldArr.length -1; i++) {
    newArr.push(oldArr[i].id)
  }
  return newArr
}

export function addMemberDataToMsg(chat, loggedUserId) {
  const messages = chat[0].messages;
 
  for(let i=0; i <= messages.length - 1; i++) {
    messages[i].userId = loggedUserId;
    messages[i].username = messages[i].author.username;
    messages[i].portrait = messages[i].author.portrait
  }
  
  return messages
}

export function filterUserValues(arr, obj) {
  const newArr = arr.filter((item) => {
    if (item != obj.portrait && item != obj.token) {
      if (item === null) {
        return " ";
      } else {
        return item;
      }
    }
  });
  return newArr
}

export function filterKeysArray(arr) {
  const newArr = arr.filter((item) => {
    if (item != "portrait" && item != "token") {
      return item;
    }
  });
  return newArr
}
