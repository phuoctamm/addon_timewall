const URL_PRIMARY = 'https://atziri.net/';

$(window).load(function () {
  console.log("hello world");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("receive message", request);

  chrome.runtime.sendMessage(
    {
      type: "notification",
      options: {
        type: "basic",
        title: "Test",
        message: "Test",
      },
    },
    (res) => {
      console.log(res);
    }
  );
});
