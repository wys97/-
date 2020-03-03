// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('ccs-authority') || '[]';
}

export function setAuthority(authority) {
  return localStorage.setItem('ccs-authority', authority);
}
