export const capitalize = (str) => {
    console.log('capitalize received: ' + str)
    return str.charAt(0).toUpperCase() + str.slice(1);
  };