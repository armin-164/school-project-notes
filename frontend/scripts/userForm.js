function loginForm() {
    const mainDiv = document.querySelector('main');
    mainDiv.innerHTML = `
        <div class="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email">
            <input type="text" placeholder="Password">
            <button>Login</button>
            <p>Don't have an account? Create one <span id="create-account">here</span>.</p>
        </div>
    `;

    const createAccountSpan = document.getElementById('create-account');
}

function displayForm() {
    const user = localStorage.getItem('user');

    if (!user) {
        loginForm();
    }
}

export default displayForm;