$(document).ready(function () {
    function changeColor() {
      if ($('#cvButton').hasClass('greyColor')) {
        $('#cvButton').removeClass('greyColor');
        $('#cvButton').addClass('blackColor');
      }
      else if ($('#cvButton').hasClass('blackColor')) {
        $('#cvButton').removeClass('blackColor');
        $('#cvButton').addClass('greenColor');
      }
      else {
        $('#cvButton').removeClass('greenColor');
        $('#cvButton').addClass('greyColor');
      }
    }
    setInterval(changeColor, 1000);

  });