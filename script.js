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
const headListsEmployee = document.querySelector(".lists-employee");

let editEmployeeId = 0;

// Employee entity

btnEmployee.addEventListener("click", (e) => {
  e.preventDefault();
  sectionTask.classList.add("hidden");
  sectionEpic.classList.add("hidden");
  sectionReport.classList.add("hidden");
  sectionEmployee.classList.remove("hidden");

  const data = JSON.parse(localStorage.getItem("Employees"));
  console.log(data);
  if (!data) headListsEmployee.classList.add("hidden");

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
  headListsEmployee.classList.remove("hidden");
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

    const empl = data.filter((em) => em.id === +selectedId);

    // Clear tasks data
    let tasks = JSON.parse(localStorage.getItem("Tasks"));
    if (!tasks) {
      tasks.forEach((t) => {
        if (t.assignee === empl.assignee) {
          t.assignee = "";
        }
      });
    }

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
  let data = JSON.parse(localStorage.getItem("Employees"));
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

// TASK ENTITY

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
const selectEpic = document.querySelector(".task-epic");
const btnEditTask = document.querySelector(".btn-edit-task");

const headListsTask = document.querySelector(".lists-task");

let editTaskId = 0;
// RENDER TASK ENTITY

btnTask.addEventListener("click", (e) => {
  e.preventDefault();
  sectionEmployee.classList.add("hidden");
  sectionEpic.classList.add("hidden");
  sectionReport.classList.add("hidden");
  sectionTask.classList.remove("hidden");

  const data = JSON.parse(localStorage.getItem("Tasks"));
  if (!data) headListsTask.classList.add("hidden");

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

  // Create assignees selector field
  renderSelectAssigne();

  // Create epics selector field
  renderSelectEpic();

  inputName.value = inputTitle.value = inputDesc.value = inputDue.value = "";
});

// SUBMIT TASK

btnSubmitTask.addEventListener("click", function (e) {
  e.preventDefault();

  formTask.classList.add("hidden");
  headListsTask.classList.remove("hidden");

  let taskObject = {};

  const title = inputTitle.value;
  const description = inputDesc.value;
  const assignee = selectAssignee.value;
  const status = inputStatus.value;
  const dueDate = inputDue.value;
  const epicId = selectEpic.value;

  taskObject = {
    id: globalIdTask++,
    title: title,
    description: description,
    assignee: assignee,
    status: status,
    dueDate: dueDate,
    epic: epicId,
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

// READING AND DELETING TASK DATA

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

    renderSelectAssigne();
    renderSelectEpic();

    // Push task data to form

    inputTitle.value = task.title;
    inputDesc.value = task.description;
    selectAssignee.value = task.assignee;
    inputStatus.value = task.status;
    inputDue.value = task.dueDate;
    selectEpic.value = task.epic;
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
  const epicId = selectEpic.value;

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
  editTask.epic = epicId;
  // Send updated data to local storage

  localStorage.setItem("Tasks", JSON.stringify(data));

  renderTasks();
});

// HELPER FUNCTION////////////////////////////////

// RENDERING TASKS

const renderTasks = function () {
  let data = JSON.parse(localStorage.getItem("Tasks"));

  const dataEmpl = JSON.parse(localStorage.getItem("Employees"));
  console.log(dataEmpl);

  listsTask.innerHTML = "";
  if (!data) return;

  data.forEach((t) => {
    let emplName = "Unassigned";
    if (dataEmpl) {
      const empl = dataEmpl.filter((e) => e.id === +t.assignee);
      console.log(empl);

      if (empl.length > 0) emplName = empl[0].name;
    }

    let html = `<li class="task-info flex">
    <p class="li-id-task">${t.id}</p>
   <p class="li-title">${t.title}</p>
  <p class="li-assignee">${emplName}</p>
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

const renderSelectAssigne = function () {
  // Create assignees selector field
  const data = JSON.parse(localStorage.getItem("Employees"));

  selectAssignee.innerHTML = `<option class="option-assignee" value="">Unassigned</option>`;

  if (data) {
    data.forEach((e) => {
      let html = `
    <option class="option-assignee"value="${e.id}">${e.name}</option>
  `;

      selectAssignee.insertAdjacentHTML("beforeend", html);
    });
  }
};

const renderSelectEpic = function () {
  // Create epics selector field
  const data = JSON.parse(localStorage.getItem("Epics"));

  selectEpic.innerHTML = `<option class="option-epic" value="">Unassigned</option>`;

  if (data) {
    data.forEach((e) => {
      let html = `
  <option class="option-epic"value="${e.id}">${e.title}</option>
`;

      selectEpic.insertAdjacentHTML("beforeend", html);
    });
  }
};

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

// ///////////////////////////////////////////////TASK/////////////////////////

// EPIC ENTITY

const sectionEpic = document.querySelector(".section-epic");
const btnEpic = document.querySelector(".btn-epic");
const formEpic = document.querySelector(".form-create-epic");
const btnCreateEpic = document.querySelector(".create-epic");
const btnSubmitEpic = document.querySelector(".submit-epic");
const inputTitleEpic = document.querySelector(".title-epic");
const inputDescEpic = document.querySelector(".description-epic");
const inputStatusEpic = document.querySelector(".select-status-epic");

const listsEpic = document.querySelector(".lists-added-epics");

const btnEditEpic = document.querySelector(".btn-edit-epic");

const headListsEpic = document.querySelector(".lists-epic");
const tasksEpic = document.querySelector(".tasks-epic-box");

let editEpicId = 0;

// RENDER EPIC ENTITY

btnEpic.addEventListener("click", (e) => {
  e.preventDefault();
  sectionEmployee.classList.add("hidden");
  sectionTask.classList.add("hidden");
  sectionReport.classList.add("hidden");
  sectionEpic.classList.remove("hidden");

  const data = JSON.parse(localStorage.getItem("Epics"));
  console.log(data);
  if (!data) headListsEpic.classList.add("hidden");

  renderEpics();
});

// ADD NEW EPIC

btnCreateEpic.addEventListener("click", function (e) {
  e.preventDefault();
  formEpic.classList.remove("hidden");
  formEpic.classList.add("overlay");
  btnSubmitEpic.classList.remove("hidden");

  listsEpic.classList.remove("hidden");

  btnEditEpic.classList.add("hidden");

  inputName.value = inputTitle.value = inputDesc.value = inputDue.value = "";
});

// SUBMIT EPIC

btnSubmitEpic.addEventListener("click", function (e) {
  e.preventDefault();

  formEpic.classList.add("hidden");
  headListsEpic.classList.remove("hidden");

  let epicObject = {};

  const title = inputTitleEpic.value;
  const description = inputDescEpic.value;

  const status = inputStatusEpic.value;

  epicObject = {
    id: globalIdEpic++,
    title: title,
    description: description,
    status: status,
  };

  console.log(epicObject);

  // Saving data to local storage

  const data = JSON.parse(localStorage.getItem("Epics"));
  console.log(data);
  if (!data) {
    const epicsArray = [epicObject];
    console.log(epicsArray);
    localStorage.setItem("Epics", JSON.stringify(epicsArray));
  } else {
    data.push(epicObject);
    localStorage.setItem("Epics", JSON.stringify(data));
  }

  console.log(JSON.parse(localStorage.getItem("Epics")));

  renderEpics();
});

//////////////////////////////////////////

// READING AND DELETING EPICS DATA

listsEpic.addEventListener("click", function (e) {
  // Checking if the delete btn is clicked
  const btnDeleteEpic = e.target.closest(".btn-delete-epic");

  if (!btnDeleteEpic) {
    if (!e.target.closest(".epic-info")) return;

    // Reading epic data as clicked
    btnEditEpic.classList.remove("hidden");
    formEpic.classList.remove("hidden");
    formEpic.classList.add("overlay");
    btnSubmitEpic.classList.add("hidden");
    listsEpic.classList.remove("hidden");

    // Get epic data from storage
    let data = JSON.parse(localStorage.getItem("Epics"));
    console.log(data);

    // Find epic id from selected html li e.
    const selectedIdEpic = e.target
      .closest(".epic-info")
      .querySelector(".li-id-epic").textContent;

    //  Get global epic id from selected html li e.
    editEpicId = +selectedIdEpic;

    // Find epic object from storage based on selected id
    const epic = data.filter((e) => e.id === +selectedIdEpic)[0];

    // Push epic data to form
    inputTitleEpic.value = epic.title;
    inputDescEpic.value = epic.description;
    inputStatusEpic.value = epic.status;

    let dataTasks = JSON.parse(localStorage.getItem("Tasks"));
    console.log(dataTasks);

    tasksEpic.innerHTML = "";

    if (!dataTasks) {
      let html = `
  <label for="list-epic">Tasks list</label>
  <input
    class="list-epic-task"
    type="text"
    placeholder="No tasks for this epic"
    readonly
  />`;
      tasksEpic.insertAdjacentHTML("beforeend", html);
    } else {
      const epicTasks = dataTasks.filter((t) => +t.epic === editEpicId);
      console.log(epicTasks);

      if (epicTasks.length === 0) {
        let html = `
        <label for="list-epic">Tasks list</label>
        <input
          class="list-epic-task"
          type="text"
          placeholder="No tasks for this epic"
          readonly
        />`;
        tasksEpic.insertAdjacentHTML("beforeend", html);
      } else {
        let cnt = 0;
        epicTasks.forEach((et) => {
          let html = `
        <label for="list-epic"></label>
        <input
          class="list-epic-task"
          type="text"
          placeholder="${et.title}"
          readonly
        />
        
        `;
          if (cnt === 0) {
            html = `
            <label for="list-epic">Tasks list</label>
        <input
          class="list-epic-task"
          type="text"
          placeholder="${et.title}"
          readonly
        />
        
        `;
          }

          tasksEpic.insertAdjacentHTML("beforeend", html);
          cnt++;
        });
      }
    }
  } else {
    // DELETING EPIC DATA

    let data = JSON.parse(localStorage.getItem("Epics"));

    const selectedIdEpic = e.target
      .closest(".epic-info")
      .querySelector(".li-id-epic").textContent;

    const epic = data.filter((e) => e.id === +selectedIdEpic);

    // Clear tasks data
    let tasks = JSON.parse(localStorage.getItem("Tasks"));
    if (!tasks) {
      tasks.forEach((t) => {
        if (t.epic === epic.id) {
          t.assignee = "";
        }
      });
    }

    data = data.filter((ep) => ep.id !== +selectedIdEpic);
    localStorage.setItem("Epics", JSON.stringify(data));
    renderEpics();
  }
});

// EDITING EPIC DATA

btnEditEpic.addEventListener("click", function (e) {
  e.preventDefault();
  btnEditEpic.classList.add("hidden");
  // btnSubmit.classList.add("hidden");
  formEpic.classList.add("hidden");

  // Get new form epic data

  const title = inputTitleEpic.value;
  const description = inputDescEpic.value;
  const status = inputStatusEpic.value;

  // Find selected epic for editing
  let data = JSON.parse(localStorage.getItem("Epics"));
  console.log(data);

  let editEpic = data.filter((e) => e.id === editEpicId)[0];

  // Update epic data
  editEpic.title = title;
  editEpic.description = description;
  editEpic.status = status;

  // Send updated data to local storage

  localStorage.setItem("Epics", JSON.stringify(data));

  renderEpics();
});

// HELPER FUNCTION////////////////////////////////

// RENDERING EPICS

const renderEpics = function () {
  let data = JSON.parse(localStorage.getItem("Epics"));

  listsEpic.innerHTML = "";
  if (!data) return;

  data.forEach((e) => {
    let html = `<li class="epic-info flex">
    <p class="li-id-epic">${e.id}</p>
   <p class="li-title-epic">${e.title}</p>
  
  <p class="li-status-epic">${e.status}</p>




    <button class="btn-delete-epic">Delete</button>
  
</li>`;

    listsEpic.insertAdjacentHTML("beforeend", html);
  });
};

// Closing the form window

const btnCloseEpic = document.querySelector(".btn-close-epic");

btnCloseEpic.addEventListener("click", function (e) {
  e.preventDefault();
  formEpic.classList.add("hidden");
  btnSubmitEpic.classList.remove("hidden");
  listsEpic.classList.remove("hidden");
});

const getMaxIdEpic = function () {
  const data = JSON.parse(localStorage.getItem("Epics"));

  let id = 0;

  if (!data) return id;

  data.forEach((e) => {
    if (e.id > id) id = e.id;
  });

  return id;
};

let globalIdEpic = getMaxIdEpic() + 1;

// ///////////////////////////////////////////////TASK/////////////////////////

// REPORTS

const sectionReport = document.querySelector(".section-report");
const btnReport = document.querySelector(".btn-report");

// RENDER REPORT

const employeeSum = document.querySelector(".report-employee-sum");
const fiveEmployeeName = document.querySelector(".report-employee-names");
const fiveEmployeeTask = document.querySelector(".report-employee-tasks");
const fiveEmployeeDate = document.querySelector(".report-employee-date");
const taskReportCompl = document.querySelector(".report__task-completed");
const taskReportInpro = document.querySelector(".report__task-inprogress");
const taskReportTodo = document.querySelector(".report__task-todo");
const taskReportTotal = document.querySelector(".report__task-total");
const epicReportCompl = document.querySelector(".report__epic-completed");
const epicReportInpro = document.querySelector(".report__epic-inprogress");
const epicReportTodo = document.querySelector(".report__epic-todo");
const epicReportTotal = document.querySelector(".report__epic-total");
const fiveEmpTaskReport = document.querySelector(".five-employee-box");

btnReport.addEventListener("click", (e) => {
  e.preventDefault();
  sectionEmployee.classList.add("hidden");
  sectionTask.classList.add("hidden");
  sectionEpic.classList.add("hidden");
  sectionReport.classList.remove("hidden");
  fiveEmpTaskReport.textContent = "";

  // RENDER EMPLOYEES REPORT DATA

  // Get data from local storage
  let dataEmp = JSON.parse(localStorage.getItem("Employees"));

  // Render total sum employee in report

  if (!dataEmp) employeeSum.textContent = 0;
  else {
    let sumEmployeeReport = Object.keys(dataEmp).length;
    console.log(sumEmployeeReport);
    employeeSum.textContent = sumEmployeeReport;
  }

  // RENDER TASKS REPORT DATA

  // Get data from local storage
  let dataTask = JSON.parse(localStorage.getItem("Tasks"));
  console.log(dataTask);

  // Render total tasks in report

  if (!dataTask) {
    taskReportTotal.textContent =
      taskReportCompl.textContent =
      taskReportInpro.textContent =
      taskReportTodo.textContent =
        0;
  } else {
    let taskTotalReport = dataTask.filter((t) => t.status).length;
    console.log(taskTotalReport);
    taskReportTotal.textContent = taskTotalReport;

    // Find 5 top employees
    // Filter tasks that are completed and due date is 30 days in past
    let timeInPast = new Date();
    timeInPast.setDate(timeInPast.getDate() - 30);
    let filteredTasks = dataTask.filter(
      (t) =>
        t.assignee != "" &&
        t.status === "Completed" &&
        Date.parse(t.dueDate) > timeInPast
    );

    if (filteredTasks.length > 0) {
      // Create mapping empl -> counter of completed tasks
      const map = new Map();
      filteredTasks.forEach((t) => {
        const emplId = t.assignee;
        let tCounter = map.get(emplId);
        if (tCounter) {
          tCounter++;
          map.set(emplId, tCounter);
        } else {
          map.set(emplId, 1);
        }
      });

      console.log(map);
      let sortedArray = [...map.entries()].sort((a, b) =>
        a[1] > b[1] ? -1 : 1
      );
      console.log(sortedArray);

      for (let i = 0; i < 5 && i < sortedArray.length; i++) {
        const empl = dataEmp.filter((e) => e.id === +sortedArray[i][0])[0];

        let html = `<p class="report-employee-names">${empl.name}</p>
<p class="report-employee-tasks">${sortedArray[i][1]}</p>`;

        fiveEmpTaskReport.insertAdjacentHTML("beforeend", html);
      }
    }

    // Render total 'completed' tasks in report

    let taskComplReport = dataTask.filter(
      (t) => t.status === "Completed"
    ).length;

    taskReportCompl.textContent = taskComplReport;

    // Render total 'in progess' tasks in report

    let taskInprogReport = dataTask.filter(
      (t) => t.status === "In progress"
    ).length;

    taskReportInpro.textContent = taskInprogReport;

    // Render total 'to do' tasks in report

    let taskToDoReport = dataTask.filter((t) => t.status === "To do").length;

    taskReportTodo.textContent = taskToDoReport;
  }

  // RENDER EPIC REPORT DATA

  // Get data from local storage
  let dataEpic = JSON.parse(localStorage.getItem("Epics"));
  console.log(dataEpic);

  // Render total epics in report

  if (!dataEpic) {
    epicReportTotal.textContent =
      epicReportCompl.textContent =
      epicReportInpro.textContent =
      epicReportTodo.textContent =
        0;
  } else {
    let epicTotalReport = dataEpic.filter((e) => e.status).length;
    console.log(epicTotalReport);
    epicReportTotal.textContent = epicTotalReport;

    // Render total 'completed' epics in report

    let epicComplReport = dataEpic.filter(
      (e) => e.status === "Completed"
    ).length;

    epicReportCompl.textContent = epicComplReport;

    // Render total 'in progess' epics in report

    let epicInprogReport = dataEpic.filter(
      (e) => e.status === "In progress"
    ).length;

    epicReportInpro.textContent = epicInprogReport;

    // Render total 'to do' epics in report

    let epicToDoReport = dataEpic.filter((e) => e.status === "To do").length;

    epicReportTodo.textContent = epicToDoReport;
  }
});
