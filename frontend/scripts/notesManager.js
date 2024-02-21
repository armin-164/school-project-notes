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




export default createNote;