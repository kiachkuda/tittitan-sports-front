
export function getAuthTokenFromCookies(): string | null {
  const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            return decodeURIComponent(value);
        }
    }
    return null;
}