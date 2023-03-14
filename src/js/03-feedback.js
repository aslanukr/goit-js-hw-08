import throttle from 'lodash.throttle';

const USER_FORM_KEY = 'feedback-form-state';

let userFormData = {};

const refs = {
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

populateUserForm();

const userFormEl = document.querySelector('.feedback-form');
userFormEl.addEventListener('submit', handleFormSubmit);
userFormEl.addEventListener('input', throttle(handleDataInput, 500));

function handleDataInput(e) {
  userFormData[e.target.name] = e.target.value;
  localStorage.setItem(USER_FORM_KEY, JSON.stringify(userFormData));
}

function populateUserForm() {
  const savedFormData = localStorage.getItem(USER_FORM_KEY);
  const parsedFormData = JSON.parse(savedFormData);

  if (savedFormData) {
    userFormData = parsedFormData;
    refs.email.value = parsedFormData.email || '';
    refs.message.value = parsedFormData.message || '';
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (refs.email.value !== '' && refs.message.value !== '') {
    console.log(userFormData);
    localStorage.removeItem(USER_FORM_KEY);
    e.target.reset();
    userFormData = {};
    return;
  }
  alert(`All fields must be filled!`);
}
