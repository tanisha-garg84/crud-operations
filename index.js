refreshTable();

function fetchData(e) {
  e.preventDefault();

  let formData = {};
  for (let index = 0; index < e.target.length - 1; index++) {
    // if (e.target.name != "rowIndex") {
    if (e.target[index].value) {
      formData = { ...formData, [e.target[index].id]: e.target[index].value };
      //   }
    }
  }
  // console.log("form", formData);

  // validations
  if ("name" in formData || "number" in formData || "relation" in formData) {
    let oldData = localStorage.getItem("formData");
    oldData = oldData ? JSON.parse(oldData) : [];
    // console.log(oldData);
    oldData.push(formData);
    localStorage.setItem("formData", JSON.stringify(oldData));
  } else {
    alert("Some field is empty");
  }
  refreshTable();
}

function deleteRow(e) {
  let arr = JSON.parse(localStorage.getItem("formData"));

  for (let index = 0; index < arr.length; index++) {
    if (index == e) {
      arr.splice(index, 1);
      console.log(arr);
      localStorage.setItem("formData", JSON.stringify(arr));
    }
  }

  refreshTable();
}

function updateRow(e) {
  let arr = JSON.parse(localStorage.getItem("formData"));

  document
    .querySelector("form")
    .setAttribute("onsubmit", `submitNewData(event, ${e})`);

  for (let index = 0; index < arr.length; index++) {
    if (index == e) {
      document.getElementById("name").value = arr[index].name;
      document.getElementById("relation").value = arr[index].relation;
      document.getElementById("number").value = arr[index].number;
    }
  }
}

function submitNewData(e, i) {
  e.preventDefault();
  console.log(e);
  console.log(i);

  let arr = JSON.parse(localStorage.getItem("formData"));

  

  arr[i].name = document.getElementById("name").value;
  arr[i].number = document.getElementById("number").value;
  arr[i].relation = document.getElementById("relation").value;

  localStorage.setItem("formData", JSON.stringify(arr));

  document.querySelector("form").setAttribute("onsubmit", "fetchData(event)");

  refreshTable();
}

function refreshTable(oldData) {
  if (localStorage.getItem("formData")) {
    let fulldata = JSON.parse(localStorage.getItem("formData"));

    console.log("refresh", fulldata);

    document.querySelector("#tabledata").remove();

    let another = document.createElement("tbody");
    another.setAttribute("id", "tabledata");
    document.querySelector("table").appendChild(another);

    for (let i = 0; i < fulldata.length; i++) {
      let table = document.querySelector("#tabledata");

      let row = table.insertRow(i);

      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);

      cell1.innerHTML = fulldata[i].name;
      cell2.innerHTML = fulldata[i].number;
      cell3.innerHTML = fulldata[i].relation;
      cell4.innerHTML = `<input type='button' value='Delete' onclick='deleteRow(${i})'></input>`;
      cell5.innerHTML = `<input type='button' value='Update' onclick='updateRow(${i})'></input>`;
    }
  }
}
