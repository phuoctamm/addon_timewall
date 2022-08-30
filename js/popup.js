document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: "start" });
    });
  } catch (e) {
    console.error(e);
  }
});

