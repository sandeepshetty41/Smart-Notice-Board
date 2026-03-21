console.log("App Started");

// 🔥 Firebase Config (REPLACE THIS)
const firebaseConfig = {
  apiKey: "AIzaSyC62UU4SKGWg50oKV0xoGjuqJMTVTqAYvQ",
  authDomain: "smart-ai-board.firebaseapp.com",
  databaseURL: "https://smart-ai-board-default-rtdb.firebaseio.com",
  projectId: "smart-ai-board"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database reference
const db = firebase.database().ref("notices");

// Add notice
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

// Button event
document.getElementById("addBtn").addEventListener("click", addNotice);

// Display notices (Realtime)
db.on("value", (snapshot) => {
  const list = document.getElementById("noticeList");
  list.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();
    const key = child.key;

    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <b>${data.message}</b><br>
        <small>${data.time}</small>
      </div>
      <button class="deleteBtn">Delete</button>
    `;

    // Delete button event
    li.querySelector(".deleteBtn").addEventListener("click", () => {
      db.child(key).remove();
    });

    list.prepend(li);
  });
});
