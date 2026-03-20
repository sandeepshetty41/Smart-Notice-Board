// 🔥 Firebase Config (PUT YOUR REAL VALUES)
const firebaseConfig = {
  apiKey: "AIzaSyC62UU4SKGWg50oKV0xoGjuqJMTVTqAYvQ",
  authDomain: "smart-ai-board.firebaseapp.com",
  databaseURL: "https://smart-ai-board-default-rtdb.firebaseio.com",
  projectId: "smart-ai-board"
};

// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("✅ Firebase initialized");

// 🔥 Database Reference
const db = firebase.database().ref("notices");
console.log("✅ Database reference created");

// 🔥 Add Notice Function
function addNotice() {
  console.log("🟡 Button clicked");

  const input = document.getElementById("noticeInput");

  if (!input) {
    console.error("❌ Input box not found!");
    return;
  }

  const text = input.value.trim();
  console.log("🟡 Input value:", text);

  if (text === "") {
    alert("Enter a notice!");
    return;
  }

  console.log("🟡 Sending data to Firebase...");

  db.push({
    message: text
  })
  .then(() => {
    console.log("✅ Notice uploaded successfully!");
  })
  .catch((error) => {
    console.error("❌ Upload failed:", error);
  });

  input.value = "";
}

// 🔥 Read Data (Realtime Check)
db.on("value", (snapshot) => {
  console.log("🟢 Data received from Firebase");

  const list = document.getElementById("noticeList");

  if (!list) {
    console.error("❌ noticeList not found!");
    return;
  }

  list.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();
    console.log("📦 Data:", data);

    const li = document.createElement("li");
    li.innerText = data.message;

    list.appendChild(li);
  });

}, (error) => {
  console.error("❌ Read failed:", error);
});