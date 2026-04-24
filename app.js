// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA9WJuPe1StJmVa6U60lpQUYPBNEnX-SpI",
  authDomain: "school-agenda-c5a41.firebaseapp.com",
  projectId: "school-agenda-c5a41",
  storageBucket: "school-agenda-c5a41.firebasestorage.app",
  messagingSenderId: "701071594618",
  appId: "1:701071594618:web:67178c552ff63509ab97c3"
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// LOGIN
window.login = function () {
    let name = document.getElementById("username").value;

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";

    let today = new Date();
    document.getElementById("dateDisplay").innerText = today.toDateString();
};

// TO-DO LIST
window.addTask = async function () {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;

    if (taskText === "") return;

    await addDoc(collection(db, "tasks"), {
        text: taskText,
        created: new Date()
    });

    taskInput.value = "";
};

// REAL-TIME TASK UPDATES
onSnapshot(collection(db, "tasks"), (snapshot) => {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    snapshot.forEach((doc) => {
        let li = document.createElement("li");
        li.innerText = doc.data().text;

        li.onclick = function () {
            li.remove();
        };

        taskList.appendChild(li);
    });
});

// MESSAGING
window.sendMessage = async function () {
    let input = document.getElementById("messageInput");
    let message = input.value;

    if (message === "") return;

    await addDoc(collection(db, "messages"), {
        text: message,
        created: new Date()
    });

    input.value = "";
};

// REAL-TIME MESSAGES
onSnapshot(collection(db, "messages"), (snapshot) => {
    let messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";

    snapshot.forEach((doc) => {
        let p = document.createElement("p");
        p.innerText = doc.data().text;
        messagesDiv.appendChild(p);
    });
});
