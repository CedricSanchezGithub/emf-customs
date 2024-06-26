<?php
/**
 * DeviensPro class.
 *
 * @category   Class
 * @package    EmfCalendar
 * @subpackage WordPress
 * @author
 * @since      1.0.0
 * php version 7.3.9
 */

namespace EmfCalendar\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

// Security Note: Blocks direct access to the plugin PHP files.
defined('ABSPATH') || die();

/**
 * emf-calendar widget class.
 *
 * @since 1.0.0
 */
class EMF_FULL_CALENDAR extends Widget_Base
{
    /**
     * Class constructor.
     *
     * @param array $data Widget data.
     * @param array $args Widget arguments.
     */
    public function __construct($data = array(), $args = null)
    {
        parent::__construct($data, $args);

        #wp_register_style(' emf-calendar-styles-vendors', plugins_url('assets/css/2.f87fbcaa.chunk.css', EMF_CALENDAR));
        #wp_register_style('emf-calendar-styles-main', plugins_url('assets/css/main.6fdcdd19.chunk.css', EMF_CALENDAR));

    }

    public function get_style_depends()
    {
        return []; //[ 'emf-calendar-styles-vendors','emf-calendar-styles-main' ];
    }

    public function get_script_depends()
    {
        return ['emf-calendar-script-vendor',
            'emf-calendar-script-main',
            'emf-calendar-script-runtime'];
    }

    /**
     * Retrieve the widget name.
     *
     * @return string Widget name.
     * @since 1.0.0
     *
     * @access public
     *
     */
    public function get_name()
    {
        return 'emf-full-calendar';
    }

    /**
     * Retrieve the widget title.
     *
     * @return string Widget title.
     * @since 1.0.0
     *
     * @access public
     *
     */
    public function get_title()
    {
        return __('emf-full-calendar', 'elementor-emf-calendar');
    }

    /**
     * Retrieve the widget icon.
     *
     * @return string Widget icon.
     * @since 1.0.0
     *
     * @access public
     *
     */
    public function get_icon()
    {
        return 'fa';
    }

    /**
     * Retrieve the list of categories the widget belongs to.
     *
     * Used to determine where to display the widget in the editor.
     *
     * Note that currently Elementor supports only one category.
     * When multiple categories passed, Elementor uses the first one.
     *
     * @return array Widget categories.
     * @since 1.0.0
     *
     * @access public
     *
     */
    public function get_categories()
    {
        return array('emf-calendar-category');
    }

    /**
     * Register the widget controls.
     *
     * Adds different input fields to allow the user to change and customize the widget settings.
     *
     * @since 1.0.0
     *
     * @access protected
     */
    protected function _register_controls()
    {
        $this->start_controls_section(
            'section_content',
            array(
                'label' => __( 'Content', 'elementor-emf-calendar' ),
            )
        );



            $this->add_control(
                'api',
                array(
                    'label' => __('api label', 'elementor-emf-calendar'),
                    'type' => Controls_Manager::TEXT,
                    'default' => __('My cool api', 'elementor-emf-calendar'),
                )
            );

            $this->add_control(
                'startEventDateFormat',
                array(
                    'label' => __('startEventDateFormat', 'elementor-emf-calendar'),
                    'type' => Controls_Manager::TEXT,
                    'default' => __('', 'elementor-emf-calendar'),
                )
            );

            $this->add_control(
                'endEventDateFormat',
                array(
                    'label' => __('endEventDateFormat', 'elementor-emf-calendar'),
                    'type' => Controls_Manager::TEXT,
                    'default' => __('', 'elementor-emf-calendar'),
                )
            );


        $this->end_controls_section();
    }

    /**
     * Render the widget output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @since 1.0.0
     *
     * @access protected
     */
    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $this->add_render_attribute(
            'emf-full-calendar-wrapper',
            [

                     'api' => wp_kses( $settings['api'], array() ),
                     'startEventDateFormat' => wp_kses( $settings['startEventDateFormat'], array() ),
                     'endEventDateFormat' => wp_kses( $settings['endEventDateFormat'], array() ),

            ]
        );
        ?>

        <emf-full-calendar <?php echo $this->get_render_attribute_string( 'emf-full-calendar-wrapper' ); ?>></emf-full-calendar>
        <?php
    }

    /**
     * Render the widget output in the editor.
     *
     * Written as a Backbone JavaScript template and used to generate the live preview.
     *
     * @since 1.0.0
     *
     * @access protected
     */
    protected function _content_template()
    {
        ?>
        <#
            view.addRenderAttribute(
                'emf-full-calendar-wrapper',
                    {

                           'api': settings.api,
                           'startEventDateFormat': settings.startEventDateFormat,
                           'endEventDateFormat': settings.endEventDateFormat,

                    }

            );
        #>

        <emf-full-calendar {{{ view.getRenderAttributeString( 'emf-full-calendar-wrapper' ) }}}></emf-full-calendar>
        <?php
    }
}
