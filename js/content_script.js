const URL_PRIMARY = 'https://atziri.net/';

$(window).load(async function () {
  const isStart = await getItemsFromStorage('is_start');
  console.log({ isStart });
  if(!isStart) {
    return true;
  }

  if(checkLocation(URL_PRIMARY)) {
    /*
      - click button
      - wait seconds
      - close tab
      - loop
    */
    console.log('start from url_primary')
    startFn();

  } else {
    console.log('start wait!');
    waitFn();
  }
});

async function startFn() {
  try {
    await waitForElmDisplay('a.clickBtn[ad-id]');
    await timeOut(1000);
    const buttonView = $('a.clickBtn[ad-id]');
    const secondView = $(buttonView).attr('ad-timer');
    await setItemsFromStorage({
      adTimer: Number(secondView)
    });

    $(buttonView)[0].click();

  } catch(e) {
    console.error(e);
    await timeOut(10000);

    window.location.reload();

  }
}

async function waitFn() {
  try {
    const adTimer = await getItemsFromStorage('adTimer');
    if(!adTimer) {
      throw new Error('not have adTimer');
    }

    console.log({adTimer});

  } catch(e) {
    console.error(e);
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("receive message", request);
  switch (request.message) {
    case 'start':
      chrome.runtime.sendMessage({type: 'close'});
      // setItemsFromStorage({
      //   is_start: true
      // }).then(() => {
      //   window.location.reload();
      // });
      break;
    default:
      break;
  }
});
