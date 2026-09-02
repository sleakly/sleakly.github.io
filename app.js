(() => {
  "use strict";

  const frame = document.querySelector("#jellyfin");
  const notice = document.querySelector("#notice");
  const noticeMessage = document.querySelector("#notice-message");
  const configuredUrl = window.JELLYFIN_CONFIG?.serverUrl;

  function showNotice(message) {
    noticeMessage.textContent = message;
    notice.hidden = false;
  }

  if (!configuredUrl) {
    showNotice("No Jellyfin server has been configured yet.");
    return;
  }

  let serverUrl;
  try {
    serverUrl = new URL(configuredUrl);
  } catch {
    showNotice("The configured Jellyfin server address is not a valid URL.");
    return;
  }

  const pageIsSecure = window.location.protocol === "https:";
  if (pageIsSecure && serverUrl.protocol !== "https:") {
    showNotice(`The server at ${serverUrl.host} uses HTTP, so the browser must block it on this secure page.`);
    return;
  }

  // Embedding keeps the visitor on the GitHub Pages URL; it never navigates or redirects.
  frame.src = serverUrl.href;
})();
