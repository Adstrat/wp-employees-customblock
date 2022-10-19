<?php 

/*
  Plugin Name: Employees Block Type
  Description: Block that displays Employees by Country
  Version: 1.0
  Author: Andrew Stratton
  Author URI: https://github.com/Adstrat/
*/

if( ! defined('ABSPATH')) exit; //Exit if accessed directly

class Employees {
  function __construct() {
    add_action('init', array($this, 'onInit'));
  }

  function onInit() {
    wp_register_style('employeeBackendStyles', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_script('employeesBackendScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
   
    register_block_type('myplugin/employeesblock', array(
      'render_callback' => array($this, 'theHTML'),
      'editor_style' => 'employeeBackendStyles',
      'editor_script' => 'employeesBackendScript'
    ));
  } 
  function theHTML($attributes) {
   if (!is_admin()) {
      wp_enqueue_script('employeeFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'), null, true);
      wp_enqueue_style('employeeFrontendStyles', plugin_dir_url(__FILE__) . 'build/index.css');
    }

    ob_start(); ?>
    <div class="employee-update-me"><pre style="display:none;"><?php echo wp_json_encode($attributes) ?></pre></div>
    <?php return ob_get_clean();
  }
}


$employees = new Employees();