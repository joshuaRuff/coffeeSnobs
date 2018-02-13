export function getToken() {
  const sessionToken = localStorage.token;
  const sessionExpires = localStorage.tokenExpires;
  if (sessionToken && sessionExpires) {
    if (checkTime(sessionExpires)) {
      return { sessionToken, sessionExpires };
    }
  }
  return false;
}

export function checkTime(dateString) {
  if (dateString) {
    try {
      const now = Date.now();
      const expires = new Date(dateString).getTime();
      if (now < expires) { return true; }
    } catch (err) {
      return false;
    }
  }
  return false;
}
