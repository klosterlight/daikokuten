const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// exports.AddMessage = functions.https.onRequest(async (request, response) => {
//   const original = {
//     text: request.query.text,
//     timestamp: admin.database.ServerValue.TIMESTAMP
//   };
//   const snapshot = await admin.database().ref('/messages').push({original: original});
//   res.redirect(303, snapshot.ref.toString());
// });

exports.intializeUserTokens = functions.auth.user().onCreate((user) => {
	admin.firestore().collection('users').doc(user.uid).set({
		tokens: 1000
	});
});
