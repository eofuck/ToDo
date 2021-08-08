//add delete checked button
//add check all button
// (add check coutner)
//fix css error

let maxItemsPerPage = 3;
let currentItemsOnLastPage = 0;
let currentPage = 1;
let lastPage = 1;
let backupTXT = "defaultTXT"; ///
let allItems = 0;
let testVar = 0;
let BoxesToDelete = 0;

function add() {
  let inside = document.getElementById("input").value;
  const txtnode = document.createTextNode(inside);

  const newDiv = document.createElement("div");
  newDiv.className = "content";
  const todoList = document.getElementById("child");

  if (inside.trim()) {
    addCheckbox(newDiv);
    let newJob = document.createElement("li");
    newJob.className = "list-group-item flex-fill bd-highlight";
    newJob.appendChild(txtnode);
    newJob.id = "target";
    todoList.appendChild(newDiv);
    newDiv.appendChild(newJob);
    newJob.addEventListener("dblclick", dblEdit);
    currentItemsOnLastPage += 1;

    allItems += 1;

    //cheks if new navigation buttons are needed
    pageCheker(newJob);
    //creats checkbox
    ////////////////addCheckbox(newDiv);
    //creates new edit button
    addEdit(newDiv);
    //creates new delete button
    //addDelete(newDiv);
    //creates new clear button
    addCancel(newDiv); //

    let allBtns = document.getElementById("pageBtns");
    allBtns.children[lastPage - 1].click();
  } else {
    alert("You can't leave input empty");
  }
  document.getElementById("input").value = "";
}

let dblEdit = function () {
  let existingTxt = this.innerHTML;
  for (let i = 0; i < allItems; i++) {
    if (
      document
        .getElementById("child")
        .childNodes[i].querySelector("#editTarget").innerHTML == "Save"
    ) {
      document
        .getElementById("child")
        .childNodes[i].querySelector("#editTarget")
        .click();
    }
  }

  let newInput = document.createElement("input");
  newInput.className = "list-group-item flex-fill bd-highlight";
  newInput.id = "target";
  newInput.value = existingTxt;
  newInput.style.textAlign = "center";
  newInput.style.border = "1.5px solid dodgerblue";
  this.parentElement.insertBefore(newInput, this.parentElement.childNodes[1]);
  this.parentElement.querySelector("#editTarget").innerHTML = "Save";
  this.remove();
};

//cheks if new navigation buttons are needed
function pageCheker(extraJob) {
  page1Func();

  let myElement = document.getElementById("child");

  let jobs = myElement.children.length;

  if (jobs > maxItemsPerPage) {
    if (currentItemsOnLastPage > maxItemsPerPage) {
      extraJob.parentElement.className = "content hideme";
      addNavigator();
    } else if (lastPage == currentPage) {
      extraJob.parentElement.className = "content showme";
    } else {
      extraJob.parentElement.className = "content hideme";
    }
  }
}

function addNavigator() {
  const newPage = document.createElement("li"); // creates new button

  newPage.id = `${lastPage + 1}`; // assings ID one greater than the previus button
  newPage.innerHTML = `${lastPage + 1}`; // assings Number one greater than the previus button
  newPage.className = "page-item page-link";

  newPage.addEventListener("click", split); //onclick only shows jobs that should be on that page
  newPage.addEventListener("click", clear); //onclick hides all other list items(jobs)

  const Parent = document.getElementById("pageBtns");
  Parent.appendChild(newPage);

  currentItemsOnLastPage = 1;
  lastPage += 1;
}

function handlerDelete() {
  this.parentElement.remove();
  deleteLogic();
  allItems -= 1;
}

function handlerBox() {
  if (this.checked == true) {
    this.parentElement.querySelector("#target").style.textDecoration =
      "line-through";
    BoxesToDelete += 1;
    document.getElementById(
      "CheckedItems"
    ).innerHTML = `Checked Items: ${BoxesToDelete}`;
  } else {
    this.parentElement.querySelector("#target").style.textDecoration =
      "initial";
    BoxesToDelete -= 1;
    document.getElementById(
      "CheckedItems"
    ).innerHTML = `Checked Items: ${BoxesToDelete}`;
  }
  if (BoxesToDelete == 0) {
    document.getElementById("father").children[2].innerHTML = "CheckAll";
  }
  if (BoxesToDelete == allItems) {
    document.getElementById("father").children[2].innerHTML = "UnCheckAll";
  }
}

function handlerCancel() {
  //this.parentElement.querySelector("#target").value = backupTXT;
  if (this.innerHTML == "Cancel") {
    if (this.parentElement.querySelector("#editTarget").innerHTML != "Edit") {
      this.parentElement.querySelector("#target").remove();
      let newJob = document.createElement("li");
      newJob.className = "list-group-item flex-fill bd-highlight";
      newJob.id = "target";
      if (this.parentElement.querySelector("#checkBox").checked) {
        newJob.style.textDecoration = "line-through";
      }
      newJob.appendChild(document.createTextNode(backupTXT));
      newJob.addEventListener("dblclick", dblEdit);
      this.parentElement.insertBefore(newJob, this.parentElement.childNodes[1]);
      this.parentElement.childNodes[2].innerHTML = "Edit";
      this.innerHTML = "Delete";
    }
  } else {
    if (this.parentElement.querySelector("#checkBox").checked) {
      BoxesToDelete -= 1;
      document.getElementById(
        "CheckedItems"
      ).innerHTML = `Checked Items: ${BoxesToDelete}`;
    }
    if (BoxesToDelete == 0) {
      document.getElementById("father").children[2].innerHTML = "CheckAll";
    }
    this.parentElement.remove();
    deleteLogic();
    allItems -= 1;
  }
}
function deleteLogic() {
  document.getElementById(currentPage).click();
  currentItemsOnLastPage -= 1;
  if (currentItemsOnLastPage == 0 && currentPage != lastPage) {
    document.getElementById(lastPage).remove();
    currentItemsOnLastPage = maxItemsPerPage; // it was 3 here
    lastPage -= 1;
  } else if (currentItemsOnLastPage == 0 && currentPage == lastPage) {
    try {
      document.getElementById(currentPage - 1).click();
      document.getElementById(lastPage).remove();
      currentItemsOnLastPage = maxItemsPerPage; // it was 3 here
      lastPage -= 1;
    } catch (e) {}
  }
}

function page1Func() {
  let firstBtn = document.getElementById("1");
  firstBtn.addEventListener("click", split);
  firstBtn.addEventListener("click", clear);
}

function split() {
  for (let i = 0; i < lastPage; i++) {
    this.parentElement.children[i].className = "page-item page-link";
  }

  this.className = "page-item page-link currentPage";

  let myElement = document.getElementById("child");
  for (
    i = maxItemsPerPage * (this.id - 1);
    i < maxItemsPerPage * this.id;
    i++
  ) {
    try {
      myElement.children[i].className = "content showme";
      currentPage = this.id;
    } catch (e) {}
  }
}

function clear() {
  let myElement = document.getElementById("child");
  //makes all before invisible
  for (let i = 0; i < maxItemsPerPage * (this.id - 1); i++) {
    myElement.children[i].className = "content hideme";
  }
  //makes all after invisible
  for (let i = maxItemsPerPage * this.id; i < myElement.children.length; i++) {
    myElement.children[i].className = "content hideme";
  }
}
function handlerEdit() {
  if (this.innerHTML === "Edit") {
    //&& ItemsBeingEdited < 1
    //this.parentElement.querySelector("#editTarget").click();
    for (let i = 0; i < allItems; i++) {
      if (
        document
          .getElementById("child")
          .childNodes[i].querySelector("#editTarget").innerHTML == "Save"
      ) {
        document
          .getElementById("child")
          .childNodes[i].querySelector("#editTarget")
          .click();
      }
    }
    let existingTxt = this.parentElement.querySelector("#target").innerHTML;
    backupTXT = existingTxt;
    this.parentElement.querySelector("#target").remove();
    let newInput = document.createElement("input");
    newInput.className = "list-group-item flex-fill bd-highlight";
    newInput.id = "target";
    newInput.value = existingTxt;
    newInput.style.border = "1.5px solid dodgerblue";
    newInput.style.textAlign = "center";

    if (this.parentElement.querySelector("#checkBox").checked) {
      newInput.style.textDecoration = "line-through";
    }
    this.parentElement.insertBefore(newInput, this.parentElement.childNodes[1]);
    this.innerHTML = "Save";
    this.parentElement.childNodes[3].innerHTML = "Cancel";
  } else {
    let newTxt = this.parentElement.querySelector("#target").value;
    if (newTxt.trim()) {
      this.parentElement.querySelector("#target").remove();
      let newJob = document.createElement("li");
      newJob.className = "list-group-item flex-fill bd-highlight";
      newJob.id = "target";
      newJob.appendChild(document.createTextNode(newTxt));
      newJob.addEventListener("dblclick", dblEdit);
      if (this.parentElement.querySelector("#checkBox").checked) {
        newJob.style.textDecoration = "line-through";
      }
      this.parentElement.insertBefore(newJob, this.parentElement.childNodes[1]);
      this.innerHTML = "Edit";
      this.parentElement.childNodes[3].innerHTML = "Delete";
    } else {
      this.parentElement.remove();
      deleteLogic();
      allItems -= 1;
      BoxesToDelete -= 1;
      document.getElementById(
        "CheckedItems"
      ).innerHTML = `Checked Items: ${BoxesToDelete}`;
      if (BoxesToDelete == 0) {
        document.getElementById("father").children[2].innerHTML = "CheckAll";
      }
    }
  }
}

function checkAll(elmt) {
  if (allItems > 0) {
    if (elmt.innerHTML != "UnCheckAll") {
      for (let i = 0; i < allItems; i++) {
        if (
          document
            .getElementById("child")
            .childNodes[i].querySelector("#checkBox").checked == true
        ) {
          document
            .getElementById("child")
            .childNodes[i].querySelector("#checkBox")
            .click();
        }
      }
      for (let i = 0; i < allItems; i++) {
        document
          .getElementById("child")
          .childNodes[i].querySelector("#checkBox")
          .click();
      }
      elmt.innerHTML = "UnCheckAll";
      BoxesToDelete = allItems;
    } else {
      for (let i = 0; i < allItems; i++) {
        if (
          document
            .getElementById("child")
            .childNodes[i].querySelector("#checkBox").checked == false
        ) {
          document
            .getElementById("child")
            .childNodes[i].querySelector("#checkBox")
            .click();
        }
      }
      for (let i = 0; i < allItems; i++) {
        document
          .getElementById("child")
          .childNodes[i].querySelector("#checkBox")
          .click();
      }
      elmt.innerHTML = "CheckAll";
    }
  }
}

let yowtf = function () {
  for (let i = 0; i < allItems; i++) {
    if (
      document.getElementById("child").childNodes[i].querySelector("#checkBox")
        .checked == true
    ) {
      document.getElementById("child").childNodes[i].remove();
      deleteLogic();
      allItems -= 1;
      BoxesToDelete -= 1;
      document.getElementById(
        "CheckedItems"
      ).innerHTML = `Checked Items: ${BoxesToDelete}`;
      if (BoxesToDelete == 0) {
        document.getElementById("father").children[2].innerHTML = "CheckAll";
      }
    } else {
      i += 1;
    }
    i -= 1;
  }
};

function moveLeft() {
  if (currentPage != 1) {
    document.getElementById(`${currentPage - 1}`).click();
  }
}

//clicks the next button
function moveRight() {
  if (currentPage != lastPage) {
    document.getElementById(`${Number(currentPage) + 1}`).click();
  }
}

function enter(event) {
  let x = event.keyCode;
  if (x === 13) {
    add();
  }
}

//creates new delete button
function addDelete(parentDIV) {
  const newDelete = document.createElement("button");
  newDelete.appendChild(document.createTextNode("Delete"));
  newDelete.className = "btn btn-outline-secondary";
  newDelete.addEventListener("click", handlerDelete);
  parentDIV.appendChild(newDelete);
}

//creates new edit button
function addEdit(parentDIV) {
  const newEdit = document.createElement("button");
  newEdit.appendChild(document.createTextNode("Edit"));
  newEdit.className = "btn btn-outline-secondary";
  newEdit.id = "editTarget";
  newEdit.addEventListener("click", handlerEdit);
  parentDIV.appendChild(newEdit);
}

function addCancel(parentDIV) {
  const newCancel = document.createElement("button");
  newCancel.appendChild(document.createTextNode("Delete"));
  newCancel.className = "btn btn-outline-secondary";
  newCancel.id = "editTarget";
  newCancel.addEventListener("click", handlerCancel);
  parentDIV.appendChild(newCancel);
}

function addCheckbox(parentDIV) {
  let idk = document.createElement("div");
  idk.className = "form-check";
  let newBox = document.createElement("INPUT");
  newBox.className = "form-check-input";
  newBox.id = "checkBox";
  newBox.setAttribute("type", "checkbox");
  newBox.addEventListener("click", handlerBox);
  //idk.appendChild(newBox);
  parentDIV.appendChild(newBox);
}
