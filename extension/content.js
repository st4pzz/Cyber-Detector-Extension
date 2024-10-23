let hijackingThreats = [];
let cookies = [];
let storageData = {
  localStorage: [],
  sessionStorage: []
};
let canvasFingerprintDetected = false;


function detectCookies() {
  let cookieString = document.cookie;
  if (cookieString) {
    cookies = cookieString.split(';').map(cookie => {
      let parts = cookie.split('=');
      return { name: parts[0].trim(), value: parts[1].trim() };
    });
  }
}
detectCookies();


function detectStorage() {

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    storageData.localStorage.push({ key: key, value: localStorage.getItem(key) });
  }

  
  for (let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i);
    storageData.sessionStorage.push({ key: key, value: sessionStorage.getItem(key) });
  }
}
detectStorage();


(function () {
  let originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function () {
    canvasFingerprintDetected = true;
    return originalToDataURL.apply(this, arguments);
  };

  let originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
  CanvasRenderingContext2D.prototype.getImageData = function () {
    canvasFingerprintDetected = true;
    return originalGetImageData.apply(this, arguments);
  };
})();


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getStorageData") {
    sendResponse({ storageData: storageData });
  } else if (request.action === "getCanvasFingerprintStatus") {
    sendResponse({ canvasFingerprintDetected: canvasFingerprintDetected });
  } else if (request.action === "getHijackingThreats") {
    sendResponse({ hijackingThreats: hijackingThreats });
  }
});
