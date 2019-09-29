const currentUser = (() => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  return currentUser;
})
export const isUserLoggedIn = (() => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if(currentUser) {
    return true;
  } else {
    return false;
  }
})

export default currentUser;
