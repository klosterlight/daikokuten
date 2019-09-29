const functions = require('firebase-functions');
const admin = require('firebase-admin');

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

functions.database.ref('/messages').onCreate((snapshot, context) => {
  const original = snapshot.val();
  console.log('AYAYAYAYA');
  console.log(original);
  const uppercase = original.toUpperCase();

  admin.database.ref('/elfish').push({
    caca: 'asdf'
  });

  return snapshot.ref.parent.child('uppercase').set(uppercase);
});
