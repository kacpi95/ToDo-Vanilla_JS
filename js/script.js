const addInput = document.querySelector('.add-input');
const errorInfo = document.querySelector('.error-info');
const btnAdd = document.querySelector('.btn-add');
const ulList = document.querySelector('.ul-list');

const popup = document.querySelector('.popup-container');
const popupInput = document.querySelector('.popup-input-text');
const btnAddPopup = document.querySelector('.add');
const btnClosePopup = document.querySelector('.cancel');

let editToDO;

const addNewNote = () => {
  if (addInput.value !== '') {
    newTodo = document.createElement('li');
    newTodo.textContent = addInput.value;

    ulList.append(newTodo);
    createNote();

    addInput.value = '';
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Wpisz treść zadania';
  }
};

const createNote = () => {
  const containerNote = document.createElement('div');
  containerNote.classList.add('containerNote');
  newTodo.append(containerNote);

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
};

const checkMethod = (e) => {
  if (e.target.matches('.complete')) {
    e.target.closest('li').classList.toggle('completed');
    e.target.classList.toggle('completed');
  } else if (e.target.matches('.edit')) {
    editFunction(e);
  } else if (e.target.matches('.delete')) {
    deleteFunction(e);
  }
};

const editFunction = (e) => {
  editToDO = e.target.closest('li');
  popupInput.value = editToDO.firstChild.textContent;
  popup.style.display = 'block';
};

const deleteFunction = (e) => {
  e.target.closest('li').remove();
};

const closePopup = () => {
  popup.style.display = 'none';
};

const changeTextPopup = () => {
  if (popupInput.value !== '') {
    editToDO.firstChild.textContent = popupInput.value;
    popup.style.display = 'none';
  } else {
    errorInfo.textContent = 'Wpisz treść';
  }
};

btnAdd.addEventListener('click', addNewNote);
ulList.addEventListener('click', checkMethod);
btnClosePopup.addEventListener('click', closePopup);
btnAddPopup.addEventListener('click', changeTextPopup);
