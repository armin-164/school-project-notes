function createNote() {
    const mainContentDiv = document.querySelector('.main-content');
    mainContentDiv.removeChild(mainContentDiv.lastChild);

    const editorContainerDiv = document.createElement('div');
    editorContainerDiv.classList.add('edit-container');

    editorContainerDiv.innerHTML = `
        <div class="content-container">
            <div class="top-section-editor">
                <input type="text" placeholder="Title" class="note-title">
                <button class="save-note-button">ye</button>
            </div>
            <textarea id="note-content"></textarea>
        </div>
    `;
    
    

    mainContentDiv.appendChild(editorContainerDiv);
    tinymce.init({
        selector: '#note-content',

        setup: (editor) => {
            editor.on('change', () => {
                editor.save();
            })
        }
    })

    const saveNoteButton = document.querySelector('.save-note-button');
    saveNoteButton.addEventListener('click', addNoteToDatabase);
    console.log(saveNoteButton)
}

function viewNote(id) {
    fetch(`http://localhost:3000/content/notes/${id}`)
    .then(res => res.json())
    .then(data => {
        if (data.length === 1) {
            const mainContentDiv = document.querySelector('.main-content');
            mainContentDiv.removeChild(mainContentDiv.lastChild);

            const viewNoteContainer = document.createElement('div');
            viewNoteContainer.classList.add('view-note-container');

            viewNoteContainer.innerHTML = `
                <div class="note">${data[0].Content}</div>
                <div class="note-options"></div>
            `;

            mainContentDiv.appendChild(viewNoteContainer);
            
        }
    })
}


function addNoteToDatabase() {
    const noteData = {
        User: localStorage.getItem('user'),
        Title: document.querySelector('.note-title').value,
        Content: document.getElementById('note-content').value
    }
    

    fetch('http://localhost:3000/content/notes/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === 'User added successfully') {
            viewNote(data.NoteID);
        }
    })
    
}

export default createNote;