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

let editEmployeeId = 0;

// Employee entity

btnEmployee.addEventListener("click", (e) => {
  e.preventDefault();
  sectionTask.classList.add("hidden");
  sectionEmployee.classList.remove("hidden");

  renderEmployees();
});

// Add new employee

btnCreate.addEventListener("click", (e) => {
  e.preventDefault();

  formCreate.classList.remove("hidden");
  formCreate.classList.add("overlay");

  listsEmployee.classList.remove("hidden");

  btnEdit.classList.add("hidden");

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

// READING AND DELETING EMPLOYEE DATA

listsEmployee.addEventListener("click", function (e) {
  // Checking if the delete btn is clicked
  const btnDel = e.target.closest(".btn-delete");

  if (!btnDel) {
    if (!e.target.closest(".employee-info")) return;
    // Reading employee data as clicked
    btnEdit.classList.remove("hidden");
    formCreate.classList.remove("hidden");
    formCreate.classList.add("overlay");
    btnSubmit.classList.add("hidden");
    listsEmployee.classList.remove("hidden");

    // Get employee data from storage
    let data = JSON.parse(localStorage.getItem("Employees"));
    console.log(data);

    // Find employee's id from selected html li e.
    const selectedId = e.target
      .closest(".employee-info")
      .querySelector(".id-empl").textContent;

    //  Get global employee's id from selected html li e.
    editEmployeeId = +selectedId;
    // Find employee object from storage based on selected id
    const employee = data.filter((e) => e.id === +selectedId)[0];

    // Push employee's data to form

    inputName.value = employee.name;
    inputEmail.value = employee.email;
    inputPhone.value = employee.phone;
    inputBirth.value = employee.birth;
    inputSalary.value = employee.salary;
  } else {
    // DELETING EMPLOYEE DATA

    let data = JSON.parse(localStorage.getItem("Employees"));
    const selectedId = e.target
      .closest(".employee-info")
      .querySelector(".id-empl").textContent;

    data = data.filter((em) => em.id !== +selectedId);
    localStorage.setItem("Employees", JSON.stringify(data));
    renderEmployees();
  }
});

// EDITING EMPLOYEE DATA

btnEdit.addEventListener("click", function (e) {
  e.preventDefault();
  btnEdit.classList.add("hidden");
  // btnSubmit.classList.add("hidden");
  formCreate.classList.add("hidden");

  // Get new form employee data

  const name = inputName.value;
  const email = inputEmail.value;
  const phone = inputPhone.value;
  const birth = inputBirth.value;
  const salary = inputSalary.value;

  // Find selected employee for editing
  let data = JSON.parse(localStorage.getItem("Employees"));
  console.log(data);

  let editEmployee = data.filter((e) => e.id === editEmployeeId)[0];

  // Update employee data
  editEmployee.name = name;
  editEmployee.email = email;
  editEmployee.phone = phone;
  editEmployee.birth = birth;
  editEmployee.salary = salary;

  // Send updated data to local storage

  localStorage.setItem("Employees", JSON.stringify(data));

  renderEmployees();
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
    let html = `
   
    <li class="employee-info">
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
const inputStatus = document.querySelector(".select-status");

const inputDue = document.querySelector(".due");
const listsTask = document.querySelector(".lists-added-tasks");
const selectAssignee = document.querySelector(".full-name-task");
const btnEditTask = document.querySelector(".btn-edit-task");

let editTaskId = 0;
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
  btnSubmitTask.classList.remove("hidden");

  listsTask.classList.remove("hidden");

  btnEditTask.classList.add("hidden");

  const data = JSON.parse(localStorage.getItem("Employees"));
  console.log(data);

  selectAssignee.innerHTML = `<option class="option-assignee" value="">Unassigned</option>`;

  data.forEach((e) => {
    let html = `
    <option class="option-assignee"value="${e.name}">${e.name}</option>
  `;

    selectAssignee.insertAdjacentHTML("beforeend", html);
  });

  inputName.value = inputTitle.value = inputDesc.value = inputDue.value = "";
});

// SUBMIT TASK

btnSubmitTask.addEventListener("click", function (e) {
  e.preventDefault();

  formTask.classList.add("hidden");

  let taskObject = {};

  const title = inputTitle.value;
  const description = inputDesc.value;
  const assignee = selectAssignee.value;
  const status = inputStatus.value;
  const dueDate = inputDue.value;

  taskObject = {
    id: globalIdTask++,
    title: title,
    description: description,
    assignee: assignee,
    status: status,
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

  renderTasks();
});

//////////////////////////////////////////

// READING AND DELETING EMPLOYEE DATA

listsTask.addEventListener("click", function (e) {
  // Checking if the delete btn is clicked
  const btnDelete = e.target.closest(".btn-delete-task");

  if (!btnDelete) {
    if (!e.target.closest(".task-info")) return;

    // Reading task data as clicked
    btnEditTask.classList.remove("hidden");
    formTask.classList.remove("hidden");
    formTask.classList.add("overlay");
    btnSubmitTask.classList.add("hidden");
    listsTask.classList.remove("hidden");

    // Get task data from storage
    let data = JSON.parse(localStorage.getItem("Tasks"));
    console.log(data);

    // Find task id from selected html li e.
    const selectedIdTask = e.target
      .closest(".task-info")
      .querySelector(".li-id-task").textContent;

    //  Get global task id from selected html li e.
    editTaskId = +selectedIdTask;
    // Find task object from storage based on selected id
    const task = data.filter((t) => t.id === +selectedIdTask)[0];

    // Push task data to form

    inputTitle.value = task.title;
    inputDesc.value = task.description;
    selectAssignee.value = task.assignee;
    inputStatus.value = task.status;
    inputDue.value = task.dueDate;
  } else {
    // DELETING TASK DATA

    let data = JSON.parse(localStorage.getItem("Tasks"));

    const selectedIdTask = e.target
      .closest(".task-info")
      .querySelector(".li-id-task").textContent;

    data = data.filter((ta) => ta.id !== +selectedIdTask);
    localStorage.setItem("Tasks", JSON.stringify(data));
    renderTasks();
  }
});

// EDITING TASK DATA

btnEditTask.addEventListener("click", function (e) {
  e.preventDefault();
  btnEditTask.classList.add("hidden");
  // btnSubmit.classList.add("hidden");
  formTask.classList.add("hidden");

  // Get new form task data

  const title = inputTitle.value;
  const description = inputDesc.value;
  const assignee = selectAssignee.value;
  const status = inputStatus.value;
  const dueDate = inputDue.value;

  // Find selected task for editing
  let data = JSON.parse(localStorage.getItem("Tasks"));
  console.log(data);

  let editTask = data.filter((t) => t.id === editTaskId)[0];

  // Update Task data
  editTask.title = title;
  editTask.description = description;
  editTask.assignee = assignee;
  editTask.status = status;
  editTask.dueDate = dueDate;

  // Send updated data to local storage

  localStorage.setItem("Tasks", JSON.stringify(data));

  renderTasks();
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
  <p class="li-assignee">${t.assignee}</p>
  <p class="li-status">${t.status}</p>

  <p class="li-due">${t.dueDate}</p>


    <button class="btn-delete-task">Delete</button>
  
</li>`;

    listsTask.insertAdjacentHTML("beforeend", html);
  });
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
