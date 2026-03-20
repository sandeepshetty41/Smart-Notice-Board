console.log("JS Loaded");

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC62UU4SKGWg50oKV0xoGjuqJMTVTqAYvQ",
  authDomain: "smart-ai-board.firebaseapp.com",
  databaseURL: "https://smart-ai-board-default-rtdb.firebaseio.com",
  projectId: "smart-ai-board"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("notices");

console.log("Firebase connected");

// Add Notice
function addNotice() {
  const input = document.getElementById("noticeInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Enter a notice");
    return;
  }

  db.push({
    message: text,
    time: new Date().toLocaleString()
  });

  input.value = "";
}

// Button click event
document.getElementById("addBtn").addEventListener("click", addNotice);

// Display notices
db.on("value", (snapshot) => {
  const list = document.getElementById("noticeList");
  list.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();
    const li = document.createElement("li");

    li.textContent = data.message;

    list.appendChild(li);
  });
});
