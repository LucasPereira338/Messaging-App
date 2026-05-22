
export function pushUniqueIdsAndChatId(uniqueIds, allIds) { 
  const userId = localStorage.getItem("userId");//except the user currently logged in's
  allIds.forEach((item) => {
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
  });
}

export function arrayObjToStr(oldArr) {
  let newArr = []
  for (let i =0; i<=oldArr.length -1; i++) {
    newArr.push(oldArr[i].id)
  }
  return newArr
}

export function addUserId(messages, userId) {
  if (typeof messages == 'undefined') {
    return "undefined 'array'"
  }
  for (let i = 0; i <= messages.length - 1; i++) {
        messages[i].userId = userId;
      }
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
