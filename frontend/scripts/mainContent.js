function createElementsForNotes() {
    const user = localStorage.getItem('user');

    if (user) {
        fetch(`http://localhost:3000/content/notes/${user}`)
        .then(res => res.json())
        .then(data => {
            const noteContainer = document.querySelector('.note-container');

            data.forEach(note => {

                const noteCard = document.createElement('div');
            noteCard.classList.add('note-card');

            const titleElement = document.createElement('h2');
            titleElement.textContent = note.Title;

            const contentElement = document.createElement('p');
            contentElement.textContent = note.Content;

            const categoryElement = document.createElement('p');
            categoryElement.textContent = `Category: ${note.Category}`;

            const lastUpdateAtElement = document.createElement('p');
            lastUpdateAtElement.innerHTML = `
            <span class="material-symbols-outlined">schedule</span>
            Last Update: ${new Date(note.LastUpdateAt).toLocaleDateString()}`;

            noteCard.appendChild(titleElement);
            noteCard.appendChild(contentElement);
            noteCard.appendChild(categoryElement);
            noteCard.appendChild(lastUpdateAtElement);

            noteContainer.appendChild(noteCard);

            })
        })
    }
}


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
    createElementsForNotes();
}


export default displayMainContent;