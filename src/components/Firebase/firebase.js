import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyALHT9heGbzKAfPPGsXLcAYhvoyeNypbjc",
  authDomain: "daikokuten-b0e1a.firebaseapp.com",
  databaseURL: "https://daikokuten-b0e1a.firebaseio.com",
  projectId: "daikokuten-b0e1a",
  storageBucket: "",
  messagingSenderId: "723772091282",
  appId: "1:723772091282:web:7357af50e83083a4d8af4b",
  measurementId: "G-5P70985YNF"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
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

  signOut() {
    this.auth.signOut();
  }

  messages = () => this.db.ref('messages');

  serverTime = () => this.db.ref('/.info/serverTimeOffset');
}

export default Firebase;
