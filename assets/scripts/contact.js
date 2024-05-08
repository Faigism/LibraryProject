import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8mt1jGbUSFDmTi3E4UZo5halIrR6t1UQ",
  authDomain: "books-3aa24.firebaseapp.com",
  databaseURL: "https://books-3aa24-default-rtdb.firebaseio.com",
  projectId: "books-3aa24",
  storageBucket: "books-3aa24.appspot.com",
  messagingSenderId: "552713213518",
  appId: "1:552713213518:web:49e0a2784b52897863551f",
  measurementId: "G-JQ7DXNZY66",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const sendButton = document.querySelector(".btn1");

sendButton.addEventListener("click", function () {
  const fullName = document.querySelector(".fullName").value;
  const emailAddress = document.querySelector(".email").value;
  const address = document.querySelector(".address").value;
  const phoneNumber = document.querySelector(".phone").value;
  const note = document.querySelector(".note").value;

  let info = {
    address,
    emailAddress,
    fullName,
    phoneNumber,
    note,
  };
  set(ref(database, `Library/contacts/${fullName}`), info);
});
