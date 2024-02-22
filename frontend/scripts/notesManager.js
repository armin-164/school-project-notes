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
                <div class="top-view-section">
                    <h2>${data[0].Title}</h2>
                    <div class="note-options">
                        <span class="material-symbols-outlined edit-note">edit</span>
                        <span class="material-symbols-outlined remove-note">delete</span>
                    </div>
                </div>
                <div class="note">${data[0].Content}</div>
                    
            `;

            mainContentDiv.appendChild(viewNoteContainer);

            const editNote = document.querySelector('.edit-note');
            editNote.addEventListener('click', () => createNote(id))
            
        }
    })
}


function addNoteToDatabase() {
    const noteData = {
        User: localStorage.getItem('userId'),
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

function updateNote(id) {
    const noteData = {
        NoteID: id,
        Title: document.querySelector('.note-title').value,
        Content: document.getElementById('note-content').value
    }

    fetch('http://localhost:3000/content/notes/update', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
    })
    
}

function createNote(id) {
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
    
      // Retrieve editor for note-content
      const existingEditor = tinymce.get('note-content');

      // Check if editor exists and remove it since it wouldnt work otherwise
      // due to editor duplications on element
      if (existingEditor) {
          existingEditor.remove();
      }

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
    if (!id) {
        saveNoteButton.addEventListener('click', addNoteToDatabase);
    }
    else {

        fetch(`http://localhost:3000/content/notes/${id}`)
        .then(res => res.json())
        .then(data => {
            const noteTitle = document.querySelector('.note-title');
            const noteContent = document.getElementById('note-content');

            noteTitle.value = data[0].Title;
            noteContent.value = data[0].Content;
            saveNoteButton.addEventListener('click',() => {
                updateNote(id);
                viewNote(id);
            });

        })
    }
}

export { createNote, viewNote };