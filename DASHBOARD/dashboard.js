// --- 🔍 LIVE SEARCH LOGIC ---
const searchInput = document.querySelector(".search-section input");
const noResultsMessage = document.getElementById("no-results");

searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase().trim();
  const sections = document.querySelectorAll(".products");

  sections.forEach((section) => {
    const products = section.querySelectorAll(".product");
    let sectionHasMatch = false;

    products.forEach((product) => {
      const title = product.querySelector("h3").innerText.toLowerCase();

      if (title.includes(term)) {
        product.style.display = ""; // Better than "block" for grid layouts
        sectionHasMatch = true;
      } else {
        product.style.display = "none";
      }
    });

    // Hide the entire section (including <h2>) if no matches found inside
    if (sectionHasMatch || term === "") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });

  // Check if everything is hidden to show "No Results"
  const anyVisible = Array.from(sections).some(
    (s) => s.style.display !== "none",
  );
  if (noResultsMessage) {
    noResultsMessage.style.display = anyVisible ? "none" : "block";
  }
});

// --- 💬 AI BUTCHER CHAT LOGIC ---
const launcher = document.getElementById("chatbot-launcher");
const chatWin = document.getElementById("chat-window");
const closeBtn = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-msg");
const chatContent = document.getElementById("chat-content");

// Open/Close toggle
if (launcher) launcher.onclick = () => (chatWin.style.display = "flex");
if (closeBtn) closeBtn.onclick = () => (chatWin.style.display = "none");

const butcherKnowledge = {
  stew: "For a rich stew, I recommend **Mutton Neck**, **Goat Shank**, or **Camel Brisket**. They soften beautifully!",
  grill:
    "Planning a BBQ? Go for **Pork Spare Ribs**, **Goat Ribs (Nyama Choma style)**, or **Mutton Loin Chops**.",
  fry: "For a quick fry, try **Pork Tenderloin** or **Camel Fillet**. They are lean and cook fast!",
  camel:
    "Camel meat is very lean! The **Hump** is mostly fat and great for flavor, while the **Fillet** is the most tender.",
  pork: "Our **Pork Belly** is perfect if you like a bit of fat, otherwise, the **Loin** is your best bet.",
};

function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(
    sender === "You" ? "user-msg-style" : "butcher-msg-style",
  );
  msgDiv.style.marginBottom = "10px";
  msgDiv.innerHTML = `<b>${sender}:</b> ${text}`;
  chatContent.appendChild(msgDiv);
  chatContent.scrollTop = chatContent.scrollHeight;
}

if (sendBtn) {
  sendBtn.onclick = () => {
    const query = userInput.value.toLowerCase().trim();
    if (!query) return;

    addMessage("You", userInput.value);
    userInput.value = "";

    setTimeout(() => {
      let response =
        "I'm not sure about that cut, but I can help with Stew, Grill, or Fry recommendations!";

      if (query.includes("stew") || query.includes("boil"))
        response = butcherKnowledge.stew;
      else if (query.includes("grill") || query.includes("bbq"))
        response = butcherKnowledge.grill;
      else if (query.includes("fry") || query.includes("fast"))
        response = butcherKnowledge.fry;
      else if (query.includes("camel")) response = butcherKnowledge.camel;
      else if (query.includes("pork")) response = butcherKnowledge.pork;

      addMessage("Butcher", response);
    }, 600);
  };
}

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
