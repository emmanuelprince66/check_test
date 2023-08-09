import Cookies from "js-cookie";

export const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};

// Set the cookie with an expiration time
export const setCookie = (cookieName, cookieValue, expirationTime) => {
  Cookies.set(cookieName, cookieValue, { expires: expirationTime });
  console.log(Cookies.get(cookieName));
};

export const isAuthenticated = () => {
  const authToken = Cookies.get("authToken");
  return !!authToken && !isCookieExpired("authToken");
};

// Check if the cookie is expired
export const isCookieExpired = (cookieName) => {
  const cookieValue = Cookies.get(cookieName);
  const cookieExpires = Cookies.get(`${cookieName}_expires`);
  const expirationDate = new Date(cookieExpires);
  return !!cookieValue && !!expirationDate && expirationDate < new Date();
};
