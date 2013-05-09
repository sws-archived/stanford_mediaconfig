/**
 *  @file
 *  Attach behaviors to formatter radio select when selecting a media's display
 *  formatter.
 */

(function ($) {
namespace('Drupal.mediaconfig');

// Override JS
Drupal.media.formatForm.submit = function () {

  // @see Drupal.behaviors.mediaFormatForm.attach().
  var buttons = $(parent.window.document.body).find('#mediaStyleSelector').parent('.ui-dialog').find('.ui-dialog-buttonpane button');

  if ($(this).hasClass('fake-cancel')) {
    buttons[1].click();
    return false;
  }

  var alt = $("#edit-options .form-item-alt input");
  if (alt.length) {
    alt = alt.val();
    if (typeof alt == "undefined" || alt.length < 1) {
      alert('Please enter some alternative text');
      return false;
    }
  }

  var titl = $("#edit-options .form-item-title input");
  if (titl.length) {
    titl = titl.val();
    if (typeof titl == "undefined" || titl.length < 1) {
      alert('Please enter some descriptive title text');
      return false;
    }
  }

  // Collect any extra form data and submit it to mediaconfig.
  var formdatavalues = {formdata : 1};
  $formelements = $("input, textarea, select");

  $.each($formelements, function(i, v) {
    formdatavalues[$(v).attr("name")] = $(v).val();
  });

  $.ajax({
    cache: false,
    success: function (data) {
      // woot!?
      buttons[0].click();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Do nothing here.
      // console.log("ERROR");
    },
    type: 'POST',
    url: Drupal.settings.basePath + 'mediaconfig/format-submit',
    data: formdatavalues,
    dataType: 'json'
  });

};

})(jQuery);
