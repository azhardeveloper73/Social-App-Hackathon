// Shared JS Functions for AZUU

// ===== Users =====
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}
function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser')) || null;
}
function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = '/Social-App-Hackathon/auth/login.html';
}

// ===== Posts =====
function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}
function setPosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// ===== Utility =====
function getFormattedDate() {
  const now = new Date();
  return now.toLocaleString();
}
