function displayMainContent() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <nav>
           <span class="username">username</span>
        </nav>
        <div class="main-content">
            <div class="top-bar">
                <p>Search</p>
            </div>
            <div class="note-container">
             
            </div>
        </div>
    `;
}


export default displayMainContent;