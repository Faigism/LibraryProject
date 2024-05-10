
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js'
import {
  getDatabase,
  ref,
  onValue,
  push,
  child,
  set,
  remove,
  update,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'

const firebaseConfig = {
  apiKey: 'AIzaSyB8mt1jGbUSFDmTi3E4UZo5halIrR6t1UQ',
  authDomain: 'books-3aa24.firebaseapp.com',
  databaseURL: 'https://books-3aa24-default-rtdb.firebaseio.com',
  projectId: 'books-3aa24',
  storageBucket: 'books-3aa24.appspot.com',
  messagingSenderId: '552713213518',
  appId: '1:552713213518:web:49e0a2784b52897863551f',
  measurementId: 'G-JQ7DXNZY66',
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const database = getDatabase(app)

const messageRef = ref(database, 'Library')

onValue(messageRef, (snap) => {
  const data = snap.val()
  console.log({ data })
})




document.getElementById("join").addEventListener("click", function() {
    var fullName = document.getElementById("joinUsFullname").value;
    var email = document.getElementById("joinUsEmail").value;

 
    if (fullName.trim() === "" || email.trim() === "") {
        document.getElementById("modalErrorMessage").style.display = "block";
        document.getElementById("modalSuccessMessage").style.display = "none";
        return;
    }


    var userdata = {
        fullName: fullName,
        email: email
    };
    database.ref('Library/users/' + fullName).set(userdata)
        .then(function() {
           
            document.getElementById("modalErrorMessage").style.display = "none";
            document.getElementById("modalSuccessMessage").style.display = "block";
        })
        .catch(function(error) {
            
            console.error("ERROR:", error);
        });
});
