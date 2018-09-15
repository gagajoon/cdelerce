String.prototype.extension = function () {
  var s = this.replace(/\\/g, '/');
  s = s.substring(s.lastIndexOf('/') + 1);
  return s.split('.')[1];
};

$(document).ready(function () {

  var image_ext = ['jpg', 'png', 'JPG', 'PNG'];
  var native_width = 0;
  var native_height = 0;
  $(".magnify-large").css("background", "url('" + $(".magnify-native").attr("src") + "') no-repeat");

  if ($(".magnify-small").length && image_ext.indexOf($(".magnify-small").attr('src').extension()) > -1) {

    $(".magnify").mouseleave(function () {
      $(".magnify-large").fadeOut(100);
    });

    //Now the mousemove function
    $(".magnify").mousemove(function (e) {

      //When the user hovers on the image, the script will first calculate
      //the native dimensions if they don't exist. Only after the native dimensions
      //are available, the script will show the zoomed version.
      if (!native_width && !native_height) {
        //This code is wrapped in the .load function which is important.
        //width and height of the object would return 0 if accessed before
        //the image gets loaded.
        native_width = $(".magnify-native").width();
        native_height = $(".magnify-native").height()
      }
      else {
        //x/y coordinates of the mouse
        //This is the position of .magnify with respect to the document.
        var magnify_offset = $(this).offset();
        //We will deduct the positions of .magnify from the mouse positions with
        //respect to the document to get the mouse positions with respect to the
        //container(.magnify)
        var mx = e.pageX - magnify_offset.left;
        var my = e.pageY - magnify_offset.top;

        //Finally the code to fade out the glass if the mouse is outside the container
        if (mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0) {
          $(".magnify-large").fadeIn(100);
        }
        else {
          $(".magnify-large").fadeOut(100);
        }
        if ($(".magnify-large").is(":visible")) {
          //The background position of .magnify-large will be changed according to the position
          //of the mouse over the .magnify-small image. So we will get the ratio of the pixel
          //under the mouse pointer with respect to the image and use that to position the
          //large image inside the magnifying glass
          var rx = Math.round(mx / $(".magnify-small").width() * native_width - $(".magnify-large").width() / 2) * -1;
          var ry = Math.round(my / $(".magnify-small").height() * native_height - $(".magnify-large").height() / 2) * -1;
          var bgp = rx + "px " + ry + "px";

          //Time to move the magnifying glass with the mouse
          var px = mx - $(".magnify-large").width() / 2;
          var py = my - $(".magnify-large").height() / 2;
          //Now the glass moves with the mouse
          //The logic is to deduct half of the glass's width and height from the
          //mouse coordinates to place it with its center at the mouse coordinates

          //If you hover on the image now, you should see the magnifying glass in action
          $(".magnify-large").css({left: px, top: py, backgroundPosition: bgp});
        }
      }
    });
  } else {
    $(".magnify").css('cursor', 'default');
  }
});