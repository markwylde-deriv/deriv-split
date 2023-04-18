import deriv from 'deriv-browser-client'

deriv.on('change', number => {
  document.getElementById('lastCount').innerText = number;
});
