import { createNote, viewNote} from './notesManager';

function createElementsForNotes() {
    const userId = localStorage.getItem('user');

    if (userId) {
        fetch(`http://localhost:3000/content/notes/user/${userId}`)
        .then(res => res.json())
        .then(data => {
            const mainContentDiv = document.querySelector('.main-content');
            mainContentDiv.removeChild(mainContentDiv.lastChild);

            const noteContainer = document.createElement('div');
            noteContainer.classList.add('note-container');

            data.forEach(note => {

            const noteCard = document.createElement('div');
            noteCard.classList.add('note-card');
            noteCard.addEventListener('click', () => viewNote(note.NoteID))

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
            mainContentDiv.appendChild(noteContainer);

            })
        })
    }
}


function displayMainContent(str) {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <nav>
           <span class="username">username</span>
        </nav>
        <div class="main-content">
            <div class="top-bar">
                <p>Search</p>
                <button class="create-note">Create</button>
            </div>
        </div>
    `;

    if (str === 'main-content') {
        createElementsForNotes();
    }

    const createNoteBtn = document.querySelector('.create-note');
    createNoteBtn.addEventListener('click', createNote)
}


export default displayMainContent;