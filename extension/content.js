// Detectar cookies
chrome.cookies.getAll({}, function(cookies) {
    console.log('Número de cookies encontrados:', cookies.length);
  });
  
  // Detectar Local Storage e Session Storage
  if (window.localStorage.length > 0) {
    console.log('Dados no Local Storage:', window.localStorage);
  }
  
  if (window.sessionStorage.length > 0) {
    console.log('Dados no Session Storage:', window.sessionStorage);
  }
  
  // Detectar Canvas Fingerprint
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Test', 2, 2);
  let canvasData = canvas.toDataURL();
  console.log('Canvas Fingerprint:', canvasData);
  