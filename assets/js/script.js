class Note{
    constructor(id, title, text){
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

class App {
    constructor(){
        this.notes = []

        this.$activeForm = document.querySelector(".take-a-note.active-form");
        this.$inactiveForm = document.querySelector(".take-a-note.inactive-form")
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$noteCanvas = document.querySelector(".notes-canvas");
        this.$form = document.getElementById('active-form');
        this.$modal = document.querySelector('.modal');
        this.$modalForm = document.querySelector('#modal-form');
        this.$modalTitle = document.querySelector("#modal-title");
        this.$modalText = document.querySelector("#modal-text");

        this.addEventListeners();
    }

    addEventListeners(){
        document.body.addEventListener("click", (event) =>{
            this.handleFormClick(event);
            this.openModal(event);
            this.closeModal(event);
        })

        this.$form.addEventListener('submit', (event) =>{
            event.preventDefault();
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            this.addNote({title, text})
            this.closeActiveForm();

        })
    }

    handleFormClick(event){
        const isActiveFormClickedOn = this.$activeForm.contains(event.target);
        const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);



        const title = this.$noteTitle.value;
        const text = this.$noteText.value;

    


        if(isInactiveFormClickedOn){
            this.openActiveForm();
        }
        else if (!isActiveFormClickedOn){
            this.addNote({title, text})
            this.closeActiveForm();
        }
    }

    openActiveForm(){
        this.$inactiveForm.style.display = "none";
        this.$activeForm.style.display = "block"
        this.$noteText.focus();
    }

    closeActiveForm(){
        this.$inactiveForm.style.display = "flex";
        this.$activeForm.style.display = "none"
        this.$noteText.value = '';
        this.$noteTitle.value = '';

    }

    openModal(event){
        const $selectedNote = event.target.closest(".note-container");
        if($selectedNote){
             this.$modalText.value = $selectedNote.children[2].innerHTML;
             this.$modalTitle.value = $selectedNote.children[1].innerHTML;
            this.$modal.classList.add('open-modal')
        }
    }

    closeModal(event){
        const isModalFormClickedOn = this.$modalForm.contains(event.target);
        if(!isModalFormClickedOn && this.$modal.classList.contains('.open-modal')){
            this.$modal.classList.remove('open-modal')
        }
    }

    addNote({ title, text}){
        if(text != ""){
            const newNote = new Note(cuid(),title, text);
            this.notes = [...this.notes, newNote];
            this.displayNotes();
        }
    
    }

    editNote(id, {title, text}){
        this.notes.map(note => {
            if(note.id == id){
                note.title = title;
                note.text = text;
            }
        })
    }

    deleteNote(id){
        this.notes = this.notes.filter((note) => note.id != id);
    }

    handleMouseOverNote(element){
    
        
        const $note = document.getElementById(element.id);
        const $checkNote = $note.querySelector(".tick")

        const $noteFooter = $note.querySelector(".note-footer")

        $checkNote.style.visibility = 'visible'
        $noteFooter.style.visibility = 'visible'

    }

    handleMouseOutNote(element){
        const $note = document.getElementById(element.id);
        const $checkNote = $note.querySelector(".tick")
        const $noteFooter = $note.querySelector(".note-footer")
        $checkNote.style.visibility = 'hidden'
        $noteFooter.style.visibility = 'hidden'
    }

    displayNotes(){
        this.$noteCanvas.innerHTML = this.notes.map((note) =>
        `
        <div class="note-container" id="${note.id}" onmouseover="app.handleMouseOverNote(this)" onmouseout="app.handleMouseOutNote(this)">
                    <span class="material-symbols-outlined tick">check_circle</span>
                    <span class="note-titles">${note.title}</span>
                    <span class="note-texts">${note.text}</span>
                    <div class="note-footer">
                        <div class=" act tooltipmain">
                            <span class="material-symbols-outlined tooltipmain2">add_alert</span>
                            <span class="tooltip-active-form ">Remind me</span>
                        </div>
                        <div class="act tooltipmain">
                            <span class="material-symbols-outlined tooltipmain2">person_add</span>
                            <span class="tooltip-active-form ">Collaborator</span>
                        </div>
                        <div class=" act tooltipmain">
                            <span class="material-symbols-outlined image tooltipmain2">palette</span>
                            <span class="tooltip-active-form">Background options</span>
                        </div>
                        <div class="act tooltipmain">
                            <span class="material-symbols-outlined image tooltipmain2">image</span>
                            <span class="tooltip-active-form">Add image</span>
                        </div>
                        <div class="act tooltipmain">
                            <span class="material-symbols-outlined image tooltipmain2">archive</span>
                            <span class="tooltip-active-form">Archive</span>
                        </div>
                        <div class="act tooltipmain">
                            <span class="material-symbols-outlined image tooltipmain2">more_vert</span>
                            <span class="tooltip-active-form">More</span>
                        </div>
                    </div>
                </div>
        `
            ).join("");
    }


}

const app = new App();







