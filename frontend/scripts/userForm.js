function createUser() {
    let userName = document.querySelector('.signup-username').value;
    let userEmail = document.querySelector('.signup-email').value.toLowerCase();
    let userPassword = document.querySelector('.signup-password').value;

    let user = {
        username: userName,
        email: userEmail,
        password: userPassword,
        apiKey: 'testkey1234',
    }

    fetch('http://localhost:3000/users/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === 'User added successfully') {
            loginForm();
            alert(data.message);
        }

        else {
            alert(data.message)
        }
    })
}


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

function signupForm() {
    const mainDiv = document.querySelector('main');
    mainDiv.innerHTML = `
    <div class="signup-container">
        <h2>Create Account</h2>
        <input type="text" class="signup-username" placeholder="Username">
        <input type="email" class="signup-email" placeholder="Email">
        <input type="text" class="signup-password" placeholder="Password">
        <button class="signup-button">Sign Up</button>
        <p>Already have an account? <span id="go-to-login">Login here</span>.</p>
    </div>
    `;

    const signupBtn = document.querySelector('.signup-button');
    signupBtn.addEventListener('click', createUser);

    const goToLoginSpan = document.getElementById('go-to-login');
    goToLoginSpan.addEventListener('click', loginForm);
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
    createAccountSpan.addEventListener('click', signupForm);
}

function displayMainContent() {
    const user = localStorage.getItem('user');

    if (!user) {
        loginForm();
    }
}

export default displayMainContent;