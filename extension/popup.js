function getThirdPartyConnections() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.runtime.sendMessage({ action: "getThirdPartyConnections", tabId: tabs[0].id }, function (response) {
        if (chrome.runtime.lastError) {
          resolve([]);
        } else {
          resolve(response.thirdPartyConnections || []);
        }
      });
    });
  });
}

function getStorageData() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getStorageData" }, function (response) {
        if (chrome.runtime.lastError) {
          resolve({ localStorage: [], sessionStorage: [] });
        } else {
          resolve(response.storageData || { localStorage: [], sessionStorage: [] });
        }
      });
    });
  });
}

function getCanvasFingerprintStatus() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getCanvasFingerprintStatus" }, function (response) {
        if (chrome.runtime.lastError) {
          resolve(false);
        } else {
          resolve(response.canvasFingerprintDetected || false);
        }
      });
    });
  });
}

function getHijackingThreats() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getHijackingThreats" }, function (response) {
        if (chrome.runtime.lastError) {
          resolve([]);
        } else {
          resolve(response.hijackingThreats || []);
        }
      });
    });
  });
}

function getCookies() {
  return new Promise(function (resolve, reject) {
    chrome.cookies.getAll({}, function (cookies) {
      resolve(cookies || []);
    });
  });
}

function calculatePrivacyScore(cookies, thirdPartyConnections, storageData, hijackingThreats, canvasFingerprintDetected) {
  let score = 0;

  if (cookies.length < 5) {
    score += 2;
  } else if (cookies.length <= 10) {
    score += 1;
  }

  if (thirdPartyConnections.length === 0) {
    score += 2;
  } else if (thirdPartyConnections.length <= 5) {
    score += 1;
  }

  if (storageData.localStorage.length === 0 && storageData.sessionStorage.length === 0) {
    score += 2;
  }

  if (hijackingThreats.length === 0) {
    score += 2;
  }
  if (!canvasFingerprintDetected) {
    score += 2;
  }

  return score;
}

function getScoreColor(score) {
  if (score >= 8) {
    return { color: '#4CAF50', text: 'Excelente' }; 
  } else if (score >= 5) {
    return { color: '#FFEB3B', text: 'Moderado' }; 
  } else {
    return { color: '#F44336', text: 'Ruim' }; 
  }
}

async function init() {
  let [cookies, thirdPartyConnections, storageData, hijackingThreats, canvasFingerprintDetected] = await Promise.all([
    getCookies(),
    getThirdPartyConnections(),
    getStorageData(),
    getHijackingThreats(),
    getCanvasFingerprintStatus()
  ]);

  
  let cookiesList = document.getElementById('cookies-info');
  if (cookies.length > 0) {
    cookies.forEach(cookie => {
      let listItem = document.createElement('li');
      listItem.textContent = `${cookie.name}: ${cookie.value}`;
      cookiesList.appendChild(listItem);
    });
  } else {
    cookiesList.textContent = "Nenhum cookie detectado.";
  }

  
  let connectionsList = document.getElementById('connections-info');
  if (thirdPartyConnections.length > 0) {
    thirdPartyConnections.forEach(connection => {
      let listItem = document.createElement('li');
      listItem.textContent = connection;
      connectionsList.appendChild(listItem);
    });
  } else {
    connectionsList.textContent = "Nenhuma conexao de terceira parte detectada.";
  }

  
  let localStorageList = document.getElementById('local-storage-info');
  let sessionStorageList = document.getElementById('session-storage-info');

  
  if (storageData.localStorage.length > 0) {
    storageData.localStorage.forEach(item => {
      let listItem = document.createElement('li');
      listItem.textContent = `${item.key}: ${item.value}`;
      localStorageList.appendChild(listItem);
    });
  } else {
    localStorageList.textContent = "Nenhum dado no Local Storage.";
  }

  
  if (storageData.sessionStorage.length > 0) {
    storageData.sessionStorage.forEach(item => {
      let listItem = document.createElement('li');
      listItem.textContent = `${item.key}: ${item.value}`;
      sessionStorageList.appendChild(listItem);
    });
  } else {
    sessionStorageList.textContent = "Nenhum dado no Session Storage.";
  }

  
  let hijackingList = document.getElementById('hijacking-info');
  if (hijackingThreats.length > 0) {
    hijackingThreats.forEach(threat => {
      let listItem = document.createElement('li');
      listItem.textContent = `Ameaca detectada: ${threat}`;
      hijackingList.appendChild(listItem);
    });
  } else {
    hijackingList.textContent = "Nenhuma ameaca de hijacking detectada.";
  }

  
  let canvasStatus = document.getElementById('canvas-fingerprint-status');
  if (canvasFingerprintDetected) {
    canvasStatus.textContent = "Tentativa de Canvas Fingerprinting detectada!";
    canvasStatus.style.color = '#F44336'; 
  } else {
    canvasStatus.textContent = "Nenhuma tentativa de Canvas Fingerprinting detectada.";
    canvasStatus.style.color = '#4CAF50'; 
  }

  
  let privacyScore = calculatePrivacyScore(cookies, thirdPartyConnections, storageData, hijackingThreats, canvasFingerprintDetected);
  let scoreElement = document.getElementById('privacy-score');
  let scoreDetails = getScoreColor(privacyScore);

  scoreElement.textContent = `Pontuacao de Privacidade: ${privacyScore} - ${scoreDetails.text}`;
  scoreElement.style.color = scoreDetails.color;
}

init();
