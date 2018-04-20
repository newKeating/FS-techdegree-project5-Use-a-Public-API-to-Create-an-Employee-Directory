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
    console.log(data.results);
    let employeeBoxHTML = ``;
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
  }
});
