chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.type === 'script' || details.type === 'image') {
        // Verificar se é uma requisição para um domínio de terceira parte
        let url = new URL(details.url);
        if (url.hostname !== window.location.hostname) {
          console.log('Conexão a um domínio de terceira parte:', url.hostname);
        }
      }
    },
    { urls: ["<all_urls>"] }
  );
  