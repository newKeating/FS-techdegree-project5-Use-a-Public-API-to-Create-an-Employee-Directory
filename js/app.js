const $employeeSectionDiv = $('#employee-section');
const $dimmingCover = $('#dimming-cover');
const $modalWindow = $('#modal-window');
const employeeData = [];
const employeeBoxArray = [];
const modalWindowArray = [];
// dimming-cover div in which the modal-window div is nested hides when window loads.
$dimmingCover.hide();
$modalWindow.hide();
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    console.log(data);
    for(let i=0; i < data.results.length; i++) {
      const dataObject = {};
      dataObject.name = `${capitalizeFirstLetter(data.results[i].name.first)} ${capitalizeFirstLetter(data.results[i].name.last)}`;
      dataObject.picture = data.results[i].picture.large;
      dataObject.email = data.results[i].email;
      dataObject.username = data.results[i].login.username;
      dataObject.cell = data.results[i].cell;
      dataObject.city = capitalizeFirstLetter(data.results[i].location.city);
      dataObject.address = `${data.results[i].location.street}, ${data.results[i].location.city}, ${data.results[i].location.state}, ${data.results[i].location.postcode}`;
      dataObject.birthdate = data.results[i].dob.substr(0,10);
      employeeData.push(dataObject);
    }
    makeEmployeeBox();
    makeModalWindow();
  }
});


const makeEmployeeBox = () => {
  for(let i=0; i < employeeData.length; i++) {
    const employeeBoxHTML = `<div class="employee-box">
                              <img class="img" src="${employeeData[i].picture}" alt="employee thumbnail picture">
                              <div class="employee-info">
                                <h4>${employeeData[i].name}</h4>
                                <p>${employeeData[i].email}</p>
                                <p>${employeeData[i].city}</p>
                              </div>
                            </div>`;
    employeeBoxArray.push(employeeBoxHTML);
  };
  $employeeSectionDiv.html(employeeBoxArray);
}

const makeModalWindow = () => {
  for(let i=0; i < employeeData.length; i++) {
    const modalWindowHTML = `<div class="modal-info">
                              <input type="image" class="close-button" src="img/clear-button.svg">
                              <img class="img-modal" src="${employeeData[i].picture}" alt="employee thumbnail picture">
                               <div class="employee-info">
                                <h4>${employeeData[i].name}</h4>
                                <p>${employeeData[i].username}</p>
                                <p>${employeeData[i].email}</p>
                               </div>
                               <hr>
                               <div class="additional-info">
                                 <p>${employeeData[i].cell}</p>
                                 <p>${employeeData[i].address}</p>
                                 <p>Birthday: ${employeeData[i].birthdate}</p>
                               </div>
                             </div>`;
    modalWindowArray.push(modalWindowHTML);
  };
  const $employeeBoxes = $('.employee-box');
  const $modalInfo = $('.modal-info');
  let clickedIndex = 0;
  $employeeBoxes.on('click', (e) => {
    if (e.target.className === 'employee-box') {
      clickedIndex = $(e.target).index();
    } else if (e.target.className === 'employee-info' || e.target.className === 'img') {
      clickedIndex = $(e.target.parentNode).index();
    } else {
      clickedIndex = $(e.target.parentNode.parentNode).index();
    }
    $dimmingCover.show();
    $modalWindow.show();
    $modalWindow.html(modalWindowArray[clickedIndex]);
  });

  $modalWindow.on('click', (e) => {
    if(e.target.className === 'close-button') {
      $dimmingCover.hide();
      $modalWindow.hide();
    }
  });
}
