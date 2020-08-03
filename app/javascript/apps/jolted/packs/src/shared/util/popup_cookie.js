function setCookie(name, domain, options = {}) {
  const { days = 0, hours = 0, minutes = 0, seconds = 30 } = options;
  const totalSeconds = seconds + (minutes * 60) + (hours * 3600) + (days * 86400);
  const expires = new Date();
  expires.setTime(expires.getTime() + (totalSeconds * 1000));
  document.cookie = `${name}=${1};expires=${expires.toGMTString()};domain=${domain};path=/;`;
}

export function setPopupComplete() {
  setCookie('jolted_popup_complete', window.location.hostname, { days: 3 });
}
