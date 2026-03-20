// 🔥 Firebase Config (REPLACE WITH YOUR DETAILS)
const firebaseConfig = {
  apiKey: "AIzaSyC62UU4SKGWg50oKV0xoGjuqJMTVTqAYvQ",
  authDomain: "smart-ai-board.firebaseapp.com",
  databaseURL: "https://smart-ai-board-default-rtdb.firebaseio.com",
  projectId: "smart-ai-board"
};

// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("✅ Firebase Connected");

// 🔥 Database Reference
const db = firebase.database().ref("notices");

// 🔥 Make function global (IMPORTANT FIX)
window.addNotice = function () {
  console.log("🟡 Add button clicked");

  const input = document.getElementById("noticeInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Enter a notice!");
    return;
  }

  db.push({
    message: text,
    time: new Date().toLocaleString()
  })
  .then(() => {
    console.log("✅ Uploaded successfully");
  })
  .catch((error) => {
    console.error("❌ Error:", error);
  });

  input.value = "";
};

// 🔥 Display Notices (Realtime)
db.on("value", (snapshot) => {
  console.log("🟢 Data loaded");

  const list = document.getElementById("noticeList");
  list.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();
    const key = child.key;

    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <b>${data.message}</b><br>
        <small>${data.time || ""}</small>
      </div>
      <button onclick="deleteNotice('${key}')">Delete</button>
    `;

    list.prepend(li);
  });
});

// 🔥 Delete Notice (GLOBAL FIX)
window.deleteNotice = function (key) {
  db.child(key).remove()
    .then(() => console.log("🗑 Deleted"))
    .catch((err) => console.error(err));
};

// 🔥 EXTRA: Check if JS is loaded
console.log("🚀 Script Loaded Successfully");
