console.log("back");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  fetch(message.url, { method: "GET" })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      console.log(res);
      sendResponse(res);
    });
  return true;
});
