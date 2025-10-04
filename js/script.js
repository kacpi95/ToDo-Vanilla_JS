const addInput = document.querySelector('.add-input');
const errorInfo = document.querySelector('.error-info');
const btnAdd = document.querySelector('.btn-add');
const ulList = document.querySelector('.ul-list');

const popup = document.querySelector('.popup-container');
const popupInput = document.querySelector('.popup-input-text');
const btnAddPopup = document.querySelector('.add');
const btnClosePopup = document.querySelector('.cancel');
const counter = document.querySelector('.counter');

let editToDo;
let notes = [];

document.addEventListener('DOMContentLoaded', () => {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = savedNotes;
  notes.forEach((el) => {
    createNotesStorage(el);
  });
});

const saveNote = () => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = () => {
  if (addInput.value !== '') {
    const listNotes = {
      id: Date.now(),
      text: addInput.value,
      completed: false,
      date: new Date(),
    };
    notes.push(listNotes);
    createNote(listNotes);
    saveNote();
    counterSum();

    addInput.value = '';
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Wpisz treść zadania';
  }
};

const createNote = (listNotes) => {
  const newNote = document.createElement('li');
  newNote.textContent = listNotes.text;
  if (listNotes.completed) newNote.classList.add('completed');
  ulList.append(newNote);

  const containerNote = document.createElement('div');
  containerNote.classList.add('containerNote');

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete');
  completeBtn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.textContent = 'EDIT';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  containerNote.append(completeBtn, editBtn, deleteBtn);
  newNote.append(containerNote);
};

const createNotesStorage = (el) => {
  createNote(el);
};

const checkMethod = (e) => {
  if (e.target.matches('.complete')) {
    const li = e.target.closest('li');
    li.classList.toggle('completed');
    e.target.classList.toggle('completed');

    const index = Array.from(ulList.children).indexOf(li);
    if (index > -1) {
      notes[index].completed = li.classList.contains('completed');
      saveNote();
    }
  } else if (e.target.matches('.edit')) {
    editFunction(e);
  } else if (e.target.matches('.delete')) {
    deleteFunction(e);
  }
  counterSum();
};

const editFunction = (e) => {
  editToDo = e.target.closest('li');
  popupInput.value = editToDo.firstChild.textContent;
  popup.style.display = 'block';
};

const deleteFunction = (e) => {
  const li = e.target.closest('li');
  const index = Array.from(ulList.children).indexOf(li);

  notes.splice(index, 1);
  saveNote();
  li.remove();
  counterSum();
};

const closePopup = () => {
  popup.style.display = 'none';
};

const changeTextPopup = () => {
  if (popupInput.value !== '') {
    const index = Array.from(ulList.children).indexOf(editToDo);
    notes[index].text = popupInput.value;
    saveNote();
    editToDo.firstChild.textContent = popupInput.value;
    popup.style.display = 'none';
  } else {
    errorInfo.textContent = 'Wpisz treść';
  }
};
const counterSum = () => {
  const sum = notes.length;
  const total = notes.filter((el) => el.completed).length;
  counter.textContent = `${sum} zadań / ${total} ukończone`;
};

btnAdd.addEventListener('click', addNewNote);
ulList.addEventListener('click', checkMethod);
btnClosePopup.addEventListener('click', closePopup);
btnAddPopup.addEventListener('click', changeTextPopup);
