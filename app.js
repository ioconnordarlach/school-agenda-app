// LOGIN
function login() {
    let name = document.getElementById("username").value;

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";

    // Show today's date
    let today = new Date();
    document.getElementById("dateDisplay").innerText = today.toDateString();
}

// TO-DO LIST
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;

    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerText = taskText;

    // delete on click
    li.onclick = function () {
        li.remove();
    };

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";

    // Notification simulation
    alert("Task added!");
}

// MESSAGING
function sendMessage() {
    let input = document.getElementById("messageInput");
    let message = input.value;

    if (message === "") return;

    let p = document.createElement("p");
    p.innerText = message;

    document.getElementById("messages").appendChild(p);

    input.value = "";
}
