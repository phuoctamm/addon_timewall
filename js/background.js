chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    console.log('remote tab', activeTab);
    chrome.tabs.remove(activeTab.id, () => {
      console.log(tabs);
    });
  });

  switch (request.type) {
    case 'remove_current_tab':
      break;
    default:
      break;
  }

  sendResponse({ foo: 'baz' })
});

function request(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
}
