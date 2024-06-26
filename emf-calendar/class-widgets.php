<?php
/**
 * emf-full-calendar class.
 *
 * @category   Class
 * @package    EmfFullCalendar
 * @subpackage WordPress
 * @author
 * @since      1.0.0
 * php version 7.3.9
 */

namespace EmfCalendar;

// Security Note: Blocks direct access to the plugin PHP files.
defined('ABSPATH') || die();

/**
 * Class Plugin
 *
 * Main Plugin class
 *
 * @since 1.0.0
 */
class Widgets
{

    /**
     * Instance
     *
     * @since 1.0.0
     * @access private
     * @static
     *
     * @var Plugin The single instance of the class.
     */
    private static $instance = null;

    /**
     * Instance
     *
     * Ensures only one instance of the class is loaded or can be loaded.
     *
     * @return Plugin An instance of the class.
     * @since 1.0.0
     * @access public
     *
     */
    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Include Widgets files
     *
     * Load widgets files
     *
     * @since 1.0.0
     * @access private
     */
    private function include_widgets_files()
    {


        require_once 'widgets/emf-full-calendar/widget.php';



    }

    public function register_categories()
    {
        \Elementor\Plugin::instance()->elements_manager->add_category(
            'emf-full-calendar-category',
            array(
                'title' => __('emf-full-calendar components', 'emf-full-calendar'),
                'icon' => 'fa fa-ship',
            )
        );
    }


    /**
     * widget_scripts
     *
     * Load required plugin core files.
     *
     * @access public
     */
    public function widget_scripts()
    {

             wp_register_script('emf-calendar-script-vendor', plugins_url('dist/vendor.js', __FILE__), array(), 'xxVERSIONxx', true);
             wp_register_script('emf-calendar-script-main', plugins_url('dist/main.js', __FILE__), array(), 'xxVERSIONxx', true);
             wp_register_script('emf-calendar-script-runtime', plugins_url('dist/runtime.js', __FILE__), array(), 'xxVERSIONxx', true);

    }

    /**
     * Register Widgets
     *
     * Register new Elementor widgets.
     *
     * @since 1.0.0
     * @access public
     */
    public function register_widgets()
    {
        // It's now safe to include Widgets files.
        $this->include_widgets_files();

        // Register the plugin widget classes.

        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widgets\EMF_FULL_CALENDAR());



    }

    /**
     *  Plugin class constructor
     *
     * Register plugin action hooks and filters
     *
     * @since 1.0.0
     * @access public
     */
    public function __construct()
    {
        // Register the widgets.
        add_action('elementor/elements/categories_registered', array($this, 'register_categories'));
        add_action('elementor/frontend/after_register_scripts', array($this, 'widget_scripts'));
        add_action('elementor/widgets/widgets_registered', array($this, 'register_widgets'));

    }
}

// Instantiate the Widgets class.
Widgets::instance();
