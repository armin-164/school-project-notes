function loginForm() {
    const mainDiv = document.querySelector('main');
    mainDiv.innerHTML = `
        <div class="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email">
            <input type="text" placeholder="Password">
            <button class='login-button'>Login</button>
            <p>Don't have an account? Create one <span id="create-account">here</span>.</p>
        </div>
    `;

    const loginBtn = document.querySelector('.login-button');
    loginBtn.addEventListener('click', console.log("hey"))

    const createAccountSpan = document.getElementById('create-account');
}

function displayMainContent() {
    const user = localStorage.getItem('user');

    if (!user) {
        loginForm();
    }
}

export default displayMainContent;