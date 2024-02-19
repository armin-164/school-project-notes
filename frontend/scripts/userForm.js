function checkLogin() {
    const checkEmail = document.querySelector('.login-email').value;
    const checkPassword = document.querySelector('.login-password').value;

    let user = {
        email: checkEmail,
        password: checkPassword,
        apiKey: 'testkey1234'
    }

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (!data.userId) {
            return alert(data.message)
        }

        localStorage.setItem('user', data.userId);
    })
}

function loginForm() {
    const mainDiv = document.querySelector('main');
    mainDiv.innerHTML = `
        <div class="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email" class="login-email">
            <input type="text" placeholder="Password" class="login-password">
            <button class="login-button">Login</button>
            <p>Don't have an account? Create one <span id="create-account">here</span>.</p>
        </div>
    `;

    const loginBtn = document.querySelector('.login-button');
    loginBtn.addEventListener('click', checkLogin);

    const createAccountSpan = document.getElementById('create-account');
}

function displayMainContent() {
    const user = localStorage.getItem('user');

    if (!user) {
        loginForm();
    }
}

export default displayMainContent;