document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if(!user){
    return alert("Invalid email or password!");
  }

  setCurrentUser(user);
  window.location.href = "../home/index.html";
});
