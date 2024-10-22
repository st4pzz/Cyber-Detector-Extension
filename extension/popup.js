chrome.cookies.getAll({}, function(cookies) {
    document.getElementById('cookies-info').innerText = `Cookies: ${cookies.length}`;
  });
  
  document.getElementById('storage-info').innerText = `Local Storage: ${localStorage.length} | Session Storage: ${sessionStorage.length}`;
  