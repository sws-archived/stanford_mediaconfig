<?php
/**
 * @file
 * A collection of administrative UI features
 */


/**
 * A configuration form that allows the user to reset the settings
 * @param  [type] $form       [description]
 * @param  [type] $form_state [description]
 * @return [type] $form       [description]
 */
function mediaconfig_reset_form($form, &$form_state) {

  return confirm_form(
    $form,
    "Are you sure you want to reset the Media Configuration?",
    'admin/config/media',
    t('This action cannot be undone.'),
    t('Reset Configuration')
  );

}

/**
 * [mediaconfig_reset_form_submit description]
 * @param  [type] $form       [description]
 * @param  [type] $form_state [description]
 * @return [type]             [description]
 */
function mediaconfig_reset_form_submit($form, &$form_state) {

  // If the user confirms to reset the values just run the enable script again.
  if ($form_state['values']['confirm']) {
    mediaconfig_enable();
    drupal_set_message("Configuration has been reset", 'status');
  }

}
