"use strict";

const btnEmployee = document.querySelector(".btn-employee");
const sectionEmployee = document.querySelector(".section-employee");
const btnCreate = document.querySelector(".create");
const formCreate = document.querySelector(".form-create");
const btnSubmit = document.querySelector(".submit");

const inputName = document.querySelector(".full-name");
const inputEmail = document.querySelector(".i-email");
const inputPhone = document.querySelector(".phone");
const inputBirth = document.querySelector(".birth");
const inputSalary = document.querySelector(".salary");
const listsEmployee = document.querySelector(".lists-added-employee");
const btnClose = document.querySelector(".btn-close");
// const employeeInfo = document.querySelector(".employee-info");

// Employee entity

btnEmployee.addEventListener("click", (e) => {
  e.preventDefault();
  sectionEmployee.classList.remove("hidden");

  renderEmployees();
});

// Add new employee

btnCreate.addEventListener("click", (e) => {
  e.preventDefault();

  formCreate.classList.remove("hidden");

  inputName.value =
    inputEmail.value =
    inputPhone.value =
    inputBirth.value =
    inputSalary.value =
      "";
});

// Submiting new employee

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  formCreate.classList.add("hidden");

  // Getting data from the form
  let addEmployee = {};

  const name = inputName.value;
  const email = inputEmail.value;
  const phone = inputPhone.value;
  const birth = inputBirth.value;
  const salary = inputSalary.value;

  addEmployee = {
    id: globalId++,
    name: name,
    email: email,
    phone: phone,
    birth: birth,
    salary: salary,
  };
  console.log(addEmployee);

  // Saving data to local storage

  const data = JSON.parse(localStorage.getItem("Employees"));
  console.log(data);
  if (!data) {
    const emplArray = [addEmployee];
    localStorage.setItem("Employees", JSON.stringify(emplArray));
  } else {
    data.push(addEmployee);
    localStorage.setItem("Employees", JSON.stringify(data));
  }

  console.log(JSON.parse(localStorage.getItem("Employees")));

  renderEmployees();
});

// Reading employee information in form at all screen on click

listsEmployee.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-delete");
  if (!btn) {
    formCreate.classList.toggle("hidden");
    btnSubmit.classList.add("hidden");
    listsEmployee.classList.add("hidden");
  } else {
    const liElem = e.target.closest(".employee-info");
    const idElem = liElem.querySelector(".id-empl");
    let data = JSON.parse(localStorage.getItem("Employees"));
    console.log(data);

    data = data.filter((em) => em.id !== +idElem.innerHTML);
    localStorage.setItem("Employees", JSON.stringify(data));
    renderEmployees();
  }
});

// HELPER FUNCTION

// Renedering form data as a list items

const renderEmployees = function () {
  const data = JSON.parse(localStorage.getItem("Employees"));
  console.log(data);

  listsEmployee.innerHTML = "";
  if (!data) return;

  data.forEach((e) => {
    let html = `<li class="employee-info flex">
    <p class="id-empl">${e.id}</p>
  <p class="fullname">${e.name}</p>
  <p class="email">${e.email}</p>
  <p class="phone-number">${e.phone}</p>
  <p class="birth-date">${e.birth}</p>
  <p class="monthly-salary">${e.salary}</p>
  
    <button class="btn-delete">Delete</button>
  
</li>`;

    listsEmployee.insertAdjacentHTML("beforeend", html);
  });
};

// Closing the form window

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  formCreate.classList.add("hidden");
  btnSubmit.classList.remove("hidden");
  listsEmployee.classList.remove("hidden");
});

const btnDs = document.querySelector(".btn-ds");

btnDs.addEventListener("click", function name(params) {
  localStorage.clear();
  renderEmployees();
});

const getMaxId = function () {
  const data = JSON.parse(localStorage.getItem("Employees"));

  let id = 0;

  if (!data) return id;

  data.forEach((e) => {
    if (e.id > id) id = e.id;
  });

  return id;
};

let globalId = getMaxId() + 1;
