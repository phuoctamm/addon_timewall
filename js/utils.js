function checkLocation(path) {
  return window.location.href.indexOf(path) > -1;
}

function timeOut(ms = 5000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function request(url, method = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
    };
    if (method === "POST") {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      options.body = formData;
    }

    fetch(url, options)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
}

function randomStr(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getCategoryFromStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("category", function (result) {
      if (result.category) {
        const category = result.category.toUpperCase();
        const jsonCategory = category.split(", ");
        resolve(jsonCategory);
      } else {
        resolve([]);
      }
    });
  });
}

function includesOfString(string, needed) {
  return string.indexOf(needed) > -1;
}

function parseJSONCustom(string) {
  string = string
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\&/g, "&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
  string = string.replace(/[\u0000-\u0019]+/g, "");
  return JSON.parse(string);
}

const getItemsFromStorage = async function (key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, function (value) {
        resolve(typeof key === "string" ? value[key] : value);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

const setItemsFromStorage = async function (obj) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(obj, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

const removeItemsFromStorage = async function (keys) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.remove(keys, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

function scrollToElm(querySelector) {
  return new Promise((resolve, reject) => {
    $("html, body").animate(
      {
        scrollTop: $(querySelector).offset().top + 1000,
      },
      2000,
      () => {
        console.log("done animated");
        resolve();
      }
    );
  });
}

function changeInput(selector, value) {
  let elm = selector;
  if (typeof selector == "string") {
    elm = document.querySelector(selector);
  }

  elm.value = value;
  elm.dispatchEvent(new Event("change", { bubbles: true }));
}

function click(selector) {
  var el = document.querySelector(selector);
  el.dispatchEvent(new Event("click", { bubbles: true }));
}

const decodeHtmlCharCodes = (str) =>
  str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
    String.fromCharCode(charCode)
  );

function waitForElmDisplay(elm, countCheck = 0) {
  return new Promise(async (resolve, reject) => {
    if (countCheck > 60) {
      // wait for 1 minutes
      reject(new Error("Error"));
      return true;
    }

    if ($(elm).length > 0) {
      resolve();
    } else {
      await timeOut(1000);

      waitForElmDisplay(elm, countCheck + 1)
        .then(resolve)
        .catch(reject);
    }
  });
}
