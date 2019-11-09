const CurrentUser = (() => {
	const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	return currentUser;
})
export const IsUserLoggedIn = (() => {
	const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	if(currentUser) {
		return true;
	} else {
		return false;
	}
})

export default CurrentUser;
