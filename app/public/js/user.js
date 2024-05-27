document.getElementById('createUserForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role_id = document.getElementById('role_id').value;

    const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lastname, username, password, role_id })
    });

    const result = await response.json();
    document.getElementById('message').innerText = result.message || result['Error Details'];
});

// Update User
document.getElementById('updateUserForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user_id = document.getElementById('user_id').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, username, email, password })
    });

    const result = await response.json();
    document.getElementById('message').innerText = result.message || result['Error Details'];
});

// Delete User
document.getElementById('deleteUserForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user_id = document.getElementById('user_id').value;

    const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id })
    });

    const result = await response.json();
    document.getElementById('message').innerText = result.message || result['Error Details'];
});

// Get Users
document.getElementById('getUsersButton')?.addEventListener('click', async () => {
    const response = await fetch('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const users = await response.json();
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerText = `${user.name} ${user.lastname} - ${user.username}`;
        usersList.appendChild(listItem);
    });
});

// Login User
document.getElementById('loginUserForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    document.getElementById('message').innerText = result.message || result['Error Details'];
});
