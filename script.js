let naam = document.getElementById("who");
let infoList = [];
let taskList = [];
const entryElm = document.getElementById("G1");
const badElm = document.getElementById("B1");
const form = document.querySelector(".section>div:nth-child(2)");
const infoForm = document.querySelector(".section>div form");
let deleteAllBad = document.getElementById("deleteAllBad");

let entryList = [];
let badList = [];
const hrsperWeek = 24 * 7;

function toggleForm() {
  form.style.display = form.style.display === "none" ? "block" : "none";
}

const handOver = (infoForm) => {
  var forum = new FormData(infoForm);
  forum.forEach(function (value, key) {
    infoList.push({ name: key, value: value });
  });
  console.log(infoList);
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  naam.innerHTML = firstName + " " + lastName;
};

//capture the data from the form on form submit

const handleOnSubmit = (e) => {
  const formDt = new FormData(e.target);
  // console.log();
  const task = formDt.get("text");
  // console.log(task);
  const hr = +formDt.get("number");

  const taskObj = {
    task,
    hr,
    id: randomGenerator(),
    type: "G1",
  };
  // check if the new taask can fit in the available hours per week
  const ttl = totalHours();
  if (ttl + +hr > hrsperWeek) {
    return alert("SOORRY BOSS, Don't have enoughj time to fit  this task.");
  }

  //store that data in array as obj
  taskList.push(taskObj);
  // console.log(taskList);
  displayTask();
};

// displaying data in the browser
const displayTask = () => {
  entryList = taskList.filter((item) => item.type === "G1");
  // totalHours += parseInt(taskList.hr.replace(/hr/gi, ""));

  let str = "";

  entryList.map((item, i) => {
    str += `
        <tr ">
        <td>${item.task}</td>
        <td>${item.hr} hr</td>
        <td>
        <button class="btn btn-danger btn-sm" onclick="deleteTask('${item.id}'
          )">
        <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn bg-success btn-sm" onclick="switchTask('${item.id}','B1')">
        <i class="fa-solid fa-arrow-right"></i>
        </button>
        </td>
        </tr>
        `;
  });
  entryElm.innerHTML = str;
  console.log(str);
  displayBadTask();
  totalHours();
};
// const isInEntryList = entryList.some((item) => item.id === taskList.id);
// const isInBadList = badList.some((item) => item.id === taskList.id);

//displaying data in the browser
const displayBadTask = () => {
  badList = taskList.filter((item) => item.type === "B1");

  let str = "";
  badList.map((item, i) => {
    str += `
        <tr >
        <td>${item.task}</td>
        <td>${item.hr} hr</td>
        <td>
        <button class="btn btn-danger btn-sm" onclick="deleteTask('${item.id}')">
        <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn bg-success btn-sm" onclick="switchTask('${item.id}','G1')">
        <i class="fa-solid fa-arrow-left"></i>
        </button>
        </td>
        </tr>
        `;
  });

  badElm.innerHTML = str;
  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);
  document.getElementById("badHrs").innerHTML = badHrs;
  totalHours();
};

deleteAllBad.addEventListener("click", () => {
  if (window.confirm("Are you sure you want to delete  All bad tasks?")) {
    taskList = taskList.filter((item) => item.type === "G1");
    displayTask();
  }
});

//creating unique ID using the randomGenerator

const randomGenerator = (lenght = 6) => {
  const collection = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  let str = "";
  for (let i = 0; i < lenght; i++) {
    const ranNum = Math.round(Math.random() * (collection.length - 1));
    // console.log(collection[ranNum]);
    str += collection[ranNum];
  }
  return str;
};

//delete item from array based on given ID
const deleteTask = (id) => {
  if (window.confirm("Are you sure you want to delte this?")) {
    taskList = taskList.filter((item) => item.id !== id);

    displayTask();
  }
};
//switching the task between Entry and Bad Tasklist
const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });

  displayTask();
};

//creating total hours used
const totalHours = () => {
  const ttlHrs = taskList.reduce((acc, { hr }) => acc + +hr, 0);
  document.getElementById("total").innerText = ttlHrs;
  return ttlHrs;
};
