function closePopup() {
  const popup = document.getElementById("external-link-popup");
  if (popup) {
    popup.remove();
  }
}

function showPopup(linkUrl) {
  if (document.getElementById("external-link-popup")) return; // Prevent multiple popups

  const popup = document.createElement("div");
  popup.id = "external-link-popup";
  popup.style = `
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
  `;

  const title = document.createElement("h3");
  title.textContent = "External Link Detected";

  const linkText = document.createElement("p");
  linkText.id = "link-text";
  linkText.textContent = linkUrl;
  linkText.style = "word-wrap: break-word; font-size: 14px; margin: 10px 0;";

  const copyButton = document.createElement("button");
  copyButton.id = "copy-button";
  copyButton.textContent = "Copy to Clipboard";
  copyButton.style = `
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;

  const proceedButton = document.createElement("button");
  proceedButton.id = "proceed-button";
  proceedButton.textContent = "Proceed to Link";
  proceedButton.style = `
    margin-left: 10px;
    padding: 8px 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;

  const closeButton = document.createElement("button");
  closeButton.id = "close-button";
  closeButton.textContent = "Close";
  closeButton.style = `
    margin-left: 10px;
    padding: 8px 12px;
    background-color: #ccc;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;

  copyButton.onclick = () => {
    navigator.clipboard.writeText(linkUrl).then(() => {
      copyButton.textContent = "Copied ✅✅✅";
      copyButton.disabled = true;
      setTimeout(() => {
        closePopup();
      }, 1000);
    });
  };

  proceedButton.onclick = () => {
    window.location.href = linkUrl;
    closePopup();
  };

  closeButton.onclick = closePopup;

  popup.appendChild(title);
  popup.appendChild(linkText);
  popup.appendChild(copyButton);
  popup.appendChild(proceedButton);
  popup.appendChild(closeButton);

  document.body.appendChild(popup);
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

document.addEventListener("keydown", function (event) {
  const popup = document.getElementById("external-link-popup");
  if (popup && event.key === "Escape") {
    event.stopPropagation();
    closePopup();
  }
});
