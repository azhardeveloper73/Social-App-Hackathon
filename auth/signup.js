document.getElementById('signupForm').addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const users = getUsers();

  if(users.find(u => u.email === email)){
    return alert("Email already registered!");
  }

  const newUser = { name, email, password };
  users.push(newUser);
  setUsers(users);

  alert("Signup successful! Please login.");
  window.location.href = "./login.html";
});
