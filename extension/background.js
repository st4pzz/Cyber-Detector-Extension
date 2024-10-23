let thirdPartyConnections = {};

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    let url = new URL(details.url);
    let domain = url.hostname;
    let tabId = details.tabId;

    if (tabId < 0) return; 

    chrome.tabs.get(tabId, function (tab) {
      if (chrome.runtime.lastError || !tab.url) return;

      let mainDomain = new URL(tab.url).hostname;

      if (domain !== mainDomain) {
        if (!thirdPartyConnections[tabId]) {
          thirdPartyConnections[tabId] = [];
        }
        if (!thirdPartyConnections[tabId].includes(domain)) {
          thirdPartyConnections[tabId].push(domain);
        }
      }
    });
  },
  { urls: ["<all_urls>"] },
  []
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getThirdPartyConnections") {
    let tabId = request.tabId;
    let connections = thirdPartyConnections[tabId] || [];
    sendResponse({ thirdPartyConnections: connections });
  }
});
