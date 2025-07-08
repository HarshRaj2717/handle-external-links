function closePopup() {
  const popup = document.getElementById("external-link-popup");
  if (popup) {
    popup.remove();
  }
}

function showPopup(linkUrl) {
  // Prevent multiple popups
  if (document.getElementById("external-link-popup")) return;

  // Create wrapper div from the popup.html structure
  const div = document.createElement("div");
  div.innerHTML = `
    <div id="external-link-popup" style="
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -20%);
      background-color: white;
      border: 2px solid #444;
      border-radius: 8px;
      padding: 20px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      width: 80%;
      max-width: 400px;
      font-family: sans-serif;
    ">
      <h3 style="margin-top: 0;">External Link Detected</h3>
      <p id="link-text" style="word-wrap: break-word; font-size: 14px; margin: 10px 0;">${linkUrl}</p>
      <button id="copy-button" style="
        padding: 8px 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Copy to Clipboard</button>
      <button id="close-button" style="
        margin-left: 10px;
        padding: 8px 12px;
        background-color: #ccc;
        color: black;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Close</button>
    </div>
  `;
  document.body.appendChild(div);

  // Button handlers
  document.getElementById("copy-button").onclick = () => {
    const button = document.getElementById("copy-button");
    navigator.clipboard.writeText(linkUrl).then(() => {
      button.textContent = "Copied ✅✅✅";
      button.disabled = true;
      setTimeout(() => {
        closePopup();
      }, 1000);
    });
  };
  document.getElementById("close-button").onclick = () => {
    closePopup();
  };
}

document.addEventListener(
  "click",
  function (event) {
    const link = event.target.closest("a");

    if (link && link.href) {
      const currentHost = window.location.hostname;
      const linkHost = new URL(link.href).hostname;

      if (linkHost !== currentHost) {
        event.preventDefault(); // Stop default link behavior
        showPopup(link.href);
      }
    }
  },
  true
);
