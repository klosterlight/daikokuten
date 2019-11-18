import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyALHT9heGbzKAfPPGsXLcAYhvoyeNypbjc",
	authDomain: "daikokuten-b0e1a.firebaseapp.com",
	databaseURL: "https://daikokuten-b0e1a.firebaseio.com",
	projectId: "daikokuten-b0e1a",
	storageBucket: "gs://daikokuten-b0e1a.appspot.com",
	messagingSenderId: "723772091282",
	appId: "1:723772091282:web:7357af50e83083a4d8af4b",
	measurementId: "G-5P70985YNF"
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.db = app.database();
		this.firestore = app.firestore();
		this.storage = app.storage();
		this.timeStamp = app.database.ServerValue.TIMESTAMP;
		this.signInOptions = [
			app.auth.EmailAuthProvider.PROVIDER_ID
			// TODO: ADD Anonymous user
		];
		this.auth.onAuthStateChanged((user) => {
			if(user)
			{
				// User is signed in.
				user.getIdToken().then((accessToken) => {
					this.user = user;
					user.accessToken = accessToken;
					sessionStorage.setItem('currentUser', JSON.stringify(user));
				})
			} else {
				this.user = null;
				sessionStorage.removeItem('currentUser');
			}
		})
	}

	signOut = () => {
		this.auth.signOut();
	}

	messages = (roomId) => this.db.ref(`rooms/${roomId}/messages`);

	serverTime = () => this.db.ref('/.info/serverTimeOffset');

	rooms = () => this.db.ref('rooms');

	bid = (roomId) => this.db.ref(`rooms/${roomId}/bids`);

	room = (roomId) => this.db.ref(`rooms/${roomId}`);

	addAuction = (auctionParams) => {
		return this.firestore.collection("auctions").add(auctionParams);
	}

	getAuctions = () => {
		return this.firestore.collection("auctions").orderBy("createdAt", "desc").get();
	}

	getViableAuctions = () => {
		const now = new Date();
		return this.firestore.collection("auctions").where("endingAt", ">=", now).orderBy("endingAt", "asc").get();
	}

	uploadFile = (fileName, blob) => {
		console.log(this.storage.ref());
		return this.storage.ref().child(fileName).put(blob);
	}

	getFile = (id) => {
		console.log(id);
		console.log('getting file');
		return this.storage.ref().child(id).getDownloadURL();
	}

}

export default Firebase;
