import { createNote, viewNote} from './notesManager';

function createElementsForNotes() {
    const userId = localStorage.getItem('userId');

    if (userId) {
        fetch(`http://localhost:3000/content/notes/user/${userId}`)
        .then(res => res.json())
        .then(data => {
            const mainContentDiv = document.querySelector('.main-content');

            if (mainContentDiv.children.length === 2) {
                mainContentDiv.removeChild(mainContentDiv.lastChild);
            }

            const allNotesContainer = document.createElement('div');
            allNotesContainer.classList.add('all-notes-container');

            if (data.length >= 1) {
                data.forEach(note => {

                    const noteCard = document.createElement('div');
                    noteCard.classList.add('note-card');
                    noteCard.addEventListener('click', () => viewNote(note.NoteID))
        
                    const titleElement = document.createElement('h2');
                    titleElement.textContent = note.Title;
        
       
                    noteCard.appendChild(titleElement);        
                    allNotesContainer.appendChild(noteCard);
                    mainContentDiv.appendChild(allNotesContainer);
        
                    })
            }
        })
    }
}


function displayMainContent(str) {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <nav>
           <span class="username">${localStorage.getItem('username')}</span>
        </nav>
        <div class="main-content">
            <div class="top-bar">
                <button class="go-home-page-button">Home</button>
                <button class="create-note">Create</button>
            </div>
        </div>
    `;

    if (str === 'main-content') {
        createElementsForNotes();
    }

    const goHomePageBtn = document.querySelector('.go-home-page-button');
    goHomePageBtn.addEventListener('click', createElementsForNotes);

    const createNoteBtn = document.querySelector('.create-note');
    createNoteBtn.addEventListener('click', () => createNote());
}


export default displayMainContent;