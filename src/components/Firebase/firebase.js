import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import moment from "moment";

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

	getAuction = (auctionId) => {
		return this.firestore.collection("auctions").doc(auctionId).get();
	}

	stopAuction = (auctionId) => {
		return this.firestore.collection("auctions").doc(auctionId).set({
			stopped: true
		}, { merge: true });
	}

	listenToStopAuction = (auctionId) => {
		return this.firestore.collection("auctions").doc(auctionId);
	}

	getViableAuctions = () => {
		const now = new Date();
		return this.firestore.collection("auctions").where("endingAt", ">=", now).orderBy("endingAt", "asc").get();
	}

	buyEntry = (auctionId) => {
		let auctionRef = this.firestore.collection("auctions").doc(auctionId);
		let userRef = this.firestore.collection("users").doc(this.user.uid);
		let userBuysRef = this.firestore.collection("userBuys").doc();

		return this.firestore.runTransaction((transaction) => {
			return transaction.get(auctionRef).then((auction) => {
				if(!auction.exists) {
					throw "Auction does not exist!";
				}

				return transaction.get(userRef).then((user) => {
					if(!user.exists) {
						throw "User does not exist!";
					}

					const userData = user.data();
					const auctionData = auction.data();
					const userTokens = parseInt(userData.tokens);
					const auctionTokens = parseInt(auctionData.tokens);
					const now = moment();
					const auctionEndsAt = moment.unix(auctionData.endingAt.seconds);
					if(userTokens < auctionTokens) {
						throw "User does not have enough tokens to buy access to auction!";
					}
					if(now.diff(auctionEndsAt) > 0) {
						throw "The auction has ended!";
					}
					if(auctionData.entries.includes(this.user.uid)) {
						throw "The user has already bought this auction!";
					}

					transaction.update(userRef, { tokens: userTokens - auctionTokens });
					transaction.update(auctionRef, { entries: app.firestore.FieldValue.arrayUnion(this.user.uid)});
					transaction.set(userBuysRef, {
						userId: this.user.uid,
						auctionId: auctionId,
						boughtAt: app.firestore.FieldValue.serverTimestamp(),
						displayName: this.user.displayName,
						email: this.user.email
					});
				});
			});
		});
	}

	bid = (auctionId) => {
		const auctionRef = this.firestore.collection("auctions").doc(auctionId);

		auctionRef.update({
			bids: app.firestore.FieldValue.arrayUnion(this.user.uid)
		});

		console.log(this.user);
		this.firestore.collection("userBids").add({
			userId: this.user.uid,
			auctionId: auctionId,
			bidAt: app.firestore.FieldValue.serverTimestamp(),
			displayName: this.user.displayName,
			email: this.user.email
		});
	}

	getUserBid = (auctionId) => {
		return this.firestore.collection("userBids")
			.where("userId", "==", this.user.uid)
			.where("auctionId", "==", auctionId)
			.get();
	}

	addBookmark = (auctionId) => {
		this.firestore.collection("auctions").doc(auctionId).update({
			bookmarks: app.firestore.FieldValue.arrayUnion(this.user.uid)
		});
	}

	removeBookmark = (auctionId) => {
		this.firestore.collection("auctions").doc(auctionId).update({
			bookmarks: app.firestore.FieldValue.arrayRemove(this.user.uid)
		});
	}

	getAuctionBidUsers = (auctionId) => {
		return this.firestore.collection("userBids")
			.where("auctionId", "==", auctionId)
			.orderBy("bidAt", "desc");
	}

	getAuctionBoughtUsers = (auctionId) => {
		return this.firestore.collection("userBuys")
			.where("auctionId", "==", auctionId)
			.orderBy("boughtAt", "desc");
	}

	uploadFile = (fileName, blob) => {
		return this.storage.ref().child(fileName).put(blob);
	}

	getFile = (id) => {
		return this.storage.ref().child(id).getDownloadURL();
	}

	getUserId = () => {
		return this.user.uid;
	}

	getMessagesByActionId = (auctionId) => {
		return this.firestore.collection("auctions").doc(auctionId).collection("messages").orderBy("postedAt", "asc");
	}

	postMessageOnAuction = (auctionId, message) => {
		const auctionRef = this.firestore.collection("auctions").doc(auctionId).collection("messages").add({
			postedAt: app.firestore.FieldValue.serverTimestamp(),
			message: message,
			userName: this.user.displayName
		});
	}

}

export default Firebase;
