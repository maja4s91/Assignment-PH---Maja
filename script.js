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
const btnEdit = document.querySelector(".btn-edit");

// Employee entity

btnEmployee.addEventListener("click", (e) => {
  sectionTask.classList.add("hidden");

  e.preventDefault();
  sectionEmployee.classList.remove("hidden");

  renderEmployees();
});

// Add new employee

btnCreate.addEventListener("click", (e) => {
  e.preventDefault();

  formCreate.classList.remove("hidden");
  formCreate.classList.add("overlay");

  listsEmployee.classList.toggle("hidden");

  if (btnEdit) btnEdit.classList.add("hidden");

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

  formCreate.classList.toggle("hidden");

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

// Reading, editing and deleting data of an employee

listsEmployee.addEventListener("click", function (e) {
  // Rendering and editing data of an employee, as clicked
  const btnDel = e.target.closest(".btn-delete");
  if (!btnDel) {
    const btnEdit = document.querySelector(".btn-edit");
    if (!btnEdit) renderEdit();
    formCreate.classList.toggle("hidden");
    btnSubmit.classList.add("hidden");
    listsEmployee.classList.add("hidden");

    //!!!!!!!!!!!!!!!!! RENDER DATA IN FORM NEEDED (FROM LIST TO FORM)

    // const liElem = e.target.closest(".employee-info");
    // const idElem = liElem.querySelector(".id-empl");
    // let data = JSON.parse(localStorage.getItem("Employees"));
    // console.log(data);

    // data = data.filter((em) => em.id === +idElem.innerHTML);
    // localStorage.setItem("Employees", JSON.stringify(data));
    // renderEmployees(); render form with data

    // BTN EDIT FUNCIONALITY
    btnEdit.addEventListener("click", function (e) {
      e.preventDefault();
      btnEdit.classList.toggle("hidden");
      btnSubmit.classList.toggle("hidden");
    });
  } else {
    // Deleting employee
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

// Adding edit button (html element)

const renderEdit = function () {
  let html = ` <button class="btn-edit">Edit</button>`;

  formCreate.insertAdjacentHTML("beforeend", html);
};

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

// ///////////////////////////////////////////////TASK/////////////////////////

// Task entity

const sectionTask = document.querySelector(".section-task");
const btnTask = document.querySelector(".btn-task");
const formTask = document.querySelector(".form-create-task");
const btnCreateTask = document.querySelector(".create-task");
const btnSubmitTask = document.querySelector(".submit-task");
const inputTitle = document.querySelector(".title");
const inputDesc = document.querySelector(".description");
const inputAssignee = document.querySelector(".full-name-task");
const inputDue = document.querySelector(".due");
const listsTask = document.querySelector(".lists-added-tasks");

// RENDER TASK ENTITY

btnTask.addEventListener("click", (e) => {
  e.preventDefault();
  sectionEmployee.classList.add("hidden");
  sectionTask.classList.remove("hidden");

  renderTasks();
});

// ADD NEW TASK

btnCreateTask.addEventListener("click", function (e) {
  e.preventDefault();
  formTask.classList.remove("hidden");
  formTask.classList.add("overlay");

  listsTask.classList.toggle("hidden");

  const btnEditTask = document.querySelector(".btn-edit-task");

  if (btnEditTask) btnEditTask.classList.add("hidden");

  inputName.value =
    inputTitle.value =
    inputDesc.value =
    inputAssignee.value =
    inputDue.value =
      "";
});

// SUBMIT TASK

btnSubmitTask.addEventListener("click", function (e) {
  e.preventDefault();

  let taskObject = {};

  const title = inputTitle.value;
  const description = inputDesc.value;
  const assignee = inputAssignee.value;
  const dueDate = inputDue.value;

  taskObject = {
    id: globalIdTask++,
    title: title,
    description: description,
    assignee: assignee,
    dueDate: dueDate,
  };

  console.log(taskObject);

  // Saving data to local storage

  const data = JSON.parse(localStorage.getItem("Tasks"));
  console.log(data);
  if (!data) {
    const tasksArray = [taskObject];
    console.log(tasksArray);
    localStorage.setItem("Tasks", JSON.stringify(tasksArray));
  } else {
    data.push(taskObject);
    localStorage.setItem("Tasks", JSON.stringify(data));
  }

  console.log(JSON.parse(localStorage.getItem("Tasks")));

  formTask.classList.toggle("hidden");

  renderTasks();
});

// Reading, editing and deleting data of an employee

listsTask.addEventListener("click", function (e) {
  // Rendering and editing data of an employee, as clicked
  const btnDelete = e.target.closest(".btn-delete-task");
  if (!btnDelete) {
    const btnEditTask = document.querySelector(".btn-edit-task");
    if (!btnEditTask) renderEditTask();
    formTask.classList.toggle("hidden");
    btnSubmitTask.classList.add("hidden");
    listsTask.classList.add("hidden");

    //!!!!!!!!!!!!!!!!! RENDER DATA IN FORM NEEDED (FROM LIST TO FORM)

    // const liElem = e.target.closest(".employee-info");
    // const idElem = liElem.querySelector(".id-empl");
    // let data = JSON.parse(localStorage.getItem("Employees"));
    // console.log(data);

    // data = data.filter((em) => em.id === +idElem.innerHTML);
    // localStorage.setItem("Employees", JSON.stringify(data));
    // renderEmployees(); render form with data

    // BTN EDIT TASK FUNCIONALITY
    btnEditTask.addEventListener("click", function (e) {
      e.preventDefault();
      btnEditTask.classList.toggle("hidden");
      btnSubmitTask.classList.toggle("hidden");
    });
  } else {
    // Deleting employee
    const liTask = e.target.closest(".task-info");

    const idTask = liTask.querySelector(".li-id-task");
    let data = JSON.parse(localStorage.getItem("Tasks"));
    console.log(data);

    data = data.filter((ta) => ta.id !== +idTask.innerHTML);
    localStorage.setItem("Tasks", JSON.stringify(data));
    renderTasks();
  }
});

// HELPER FUNCTION////////////////////////////////

// RENDERING TASKS

const renderTasks = function () {
  let data = JSON.parse(localStorage.getItem("Tasks"));

  listsTask.innerHTML = "";
  if (!data) return;

  data.forEach((t) => {
    let html = `<li class="task-info flex">
    <p class="li-id-task">${t.id}</p>
   <p class="li-title">${t.title}</p>
  <p class="li-desc">${t.description}</p>
  <p class="li-assignee">${t.assignee}</p>
  <p class="li-due">${t.dueDate}</p>


    <button class="btn-delete-task">Delete</button>
  
</li>`;

    listsTask.insertAdjacentHTML("beforeend", html);
  });
};

// Create edit button

const renderEditTask = function () {
  let html = ` <button class="btn-edit-task">Edit</button>`;

  formTask.insertAdjacentHTML("beforeend", html);
};

// Closing the form window

const btnCloseTask = document.querySelector(".btn-close-task");

btnCloseTask.addEventListener("click", function (e) {
  e.preventDefault();
  formTask.classList.add("hidden");
  btnSubmitTask.classList.remove("hidden");
  listsTask.classList.remove("hidden");
});

const getMaxIdTask = function () {
  const data = JSON.parse(localStorage.getItem("Tasks"));
  console.log(data);
  let id = 0;

  if (!data) return id;

  data.forEach((t) => {
    if (t.id > id) id = t.id;
  });

  return id;
};

let globalIdTask = getMaxIdTask() + 1;
