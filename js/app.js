const $employeeSectionDiv = $('#employee-section');
const $dimmingCover = $('#dimming-cover');

// dimming-cover div in which the modal-window div is nested hides when window loads.
$dimmingCover.hide();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    console.log(data);
    let employeeBoxHTML = ``;
    let modalWindowHTML = ``;
    for(let i=0; i < data.results.length; i++) {
      employeeBoxHTML += `<div class="employee-box">
                            <img class="img" src="${data.results[i].picture.large}" alt="employee thumbnail picture">
                            <div class="employee-info">
                              <h4>${capitalizeFirstLetter(data.results[i].name.first)} ${capitalizeFirstLetter(data.results[i].name.last)}</h4>
                              <p>${data.results[i].email}</p>
                              <p>${capitalizeFirstLetter(data.results[i].location.city)}</p>
                            </div>
                          </div>`;
    };
    $employeeSectionDiv.html(employeeBoxHTML);

    const $employeeBoxes = $('.employee-box');
    console.log($employeeBoxes);
    $employeeBoxes.on('click', (e) => {
      console.log('card clicked!');
      for(let i=0; i < data.results.length; i++) {
        modalWindowHTML += `<div class="modal-window">
                              <input type="image" class="close-button" src="img/clear-button.svg">
                              <img class="img-modal" src="${data.results[i].picture.large}}" alt="employee thumbnail picture">
                               <div class="employee-info">
                                 <h4>${capitalizeFirstLetter(data.results[i].name.first)} ${capitalizeFirstLetter(data.results[i].name.last)}</h4>
                                 <p>${data.results[i].email}</p>
                                 <p>${capitalizeFirstLetter(data.results[i].location.city)}</p>
                               </div>
                               <hr>
                               <div class="additional-info">
                                 <p>${data.results[i].cell}</p>
                                 <p>${data.results[i].location.street}, ${data.results[i].location.city}, ${data.results[i].location.state}, ${data.results[i].location.postcode}</p>
                                 <p>Birthday: ${data.results[i].dob.sub}</p>
                               </div>
                             </div>`;
      };
      $dimmingCover.html(modalWindowHTML);
    });
  }
});
