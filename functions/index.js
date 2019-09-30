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

exports.logBid = functions.database.ref('/rooms/{roomId}/bids/{bidId}').onCreate((snapshot, context) => {
  const bid = snapshot.val();

  return admin.database().ref(`/rooms/${context.params.roomId}/messages`).push({
    text: `El usuario ${bid.displayName} ha hecho una puja`,
    displayName: 'SYSTEM',
    timestamp: admin.database.ServerValue.TIMESTAMP
  });
})
