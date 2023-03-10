"use strict";
//  DOM element
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("calculate-btn");
// biến global lưu dách sách thú cưng
const petArr = [];

// bắt sự kiện khi ấn submit
submitBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: new Date(),
  };

  // thêm thú cưng vào mảng petArr
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    renderTableData(petArr);
    clearInput();
  }
});
// render dữ liệu petArr
renderTableData(petArr);

// hiện thị danh sách thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  // tạo hàng khi nhập thông tin thú cưng
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
                  <td>${petArr[i].bmi}</td>
                  <td>${petArr[i].date.getDate()}/${
      petArr[i].date.getMonth() + 1
    }/${petArr[i].date.getFullYear()} </td>
                  <td>
                  <button class="btn btn-danger" onclick="deletePet('${
                    petArr[i].id
                  }')">Delete</button>
                  </td>
                  `;
    tableBodyEl.appendChild(row);
  }
}
// xóa 1 thú cưng
function deletePet(petId) {
  const isDeleted = confirm("are you sure");
  if (isDeleted) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTableData(petArr);
      }
    }
  }
}

//  khi có trường bị nhập thiếu sẽ hiện thị thông báo
function validateData(data) {
  let isValidate = true;
  // các trường hợp cụ thể
  if (data.id.trim() === "") {
    alert("Please enter a id");
    isValidate = false;
  }
  // kiểm tra trùng lặp id
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must uniquel");
      isValidate = false;
      break;
    }
  }
  if (data.name.trim() === "") {
    alert("Please enter a name");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Please enter a age");
    isValidate = false;
  }

  if (data.type === "Select Type") {
    alert("please select type!");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Please enter a weight");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Please enter a length");
    isValidate = false;
  }

  if (data.age < 1 || data.age > 15) {
    alert("age must be between 1 and 15!");
    isValidate = false;
  }

  if (data.weight < 1 || data.weight > 15) {
    alert("weight must be between 1 and 15!");
    isValidate = false;
  }

  if (data.length < 1 || data.length > 100) {
    alert("length must be between 1 and 100!");
    isValidate = false;
  }

  if (data.breed === "Select Breed") {
    alert("please select breed!");
    isValidate = false;
  }

  return isValidate;
}
//phần đã sửa lại khi click submit nut xanh đã mất
// xóa các nội dung vừa nhập trên form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Seclect Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Seclect Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
// hiện thị thú cưng mạnh khỏe
let healthyCheck = true;

// đã sửa lại phần showhealthy pet
// hiển thị các thú cưng khỏe mạnh khi click vào btn
healthyBtn.addEventListener("click", function (e) {
  if (healthyCheck === true) {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    // render dữ liệu thú cưng khỏe mạnh
    renderTableData(healthyPetArr);

    healthyBtn.textContent = "show all pet";

    // dổi lại
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "show healthy pet";
    healthyCheck = true;
  }
});

// tính chỉ số bmi và hiển thị
calculateBmiBtn.onclick = function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
  }

  renderTableData(petArr);
};
