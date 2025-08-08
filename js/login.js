// Basic login: fetch and check against accounts.json

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const loginMessage = document.getElementById('loginMessage');
  loginMessage.style.display = 'none';
  loginMessage.classList.remove('success');
  loginMessage.classList.remove('error');

  // Load accounts.json
  let accounts = [];
  try {
    const res = await fetch('accounts.json');
    accounts = await res.json();
  } catch (err) {
    loginMessage.textContent = "Error loading accounts database.";
    loginMessage.style.display = 'block';
    return;
  }

  // Find account by username and password
  const account = accounts.find(acc => acc.name === username && acc.password === password);
  if (!account) {
    loginMessage.textContent = "Account not in database.";
    loginMessage.style.display = 'block';
    return;
  }

  loginMessage.textContent = "Login successful! Welcome, " + username + ".";
  loginMessage.classList.add('success');
  loginMessage.style.display = 'block';
  // Optionally hide the form or redirect, etc.
});
