<?php
/**
 * Elementor emf-elementor WordPress Plugin
 *
 * @package EmfElementor
 *
 * Plugin Name: emf-elementor
 * Description:
 * Plugin URI:
 * Version:     1.0.0
 * Author:
 * Author URI:
 * Text Domain: emf-elementor
 */

define('ELEMENTOR_EMF_ELEMENTOR', __FILE__);

/**
 * Include the emf-elementor class.
 */
require plugin_dir_path(ELEMENTOR_EMF_ELEMENTOR) . 'class-react-elementor.php';

require_once(__DIR__ . '/dynamic-tags/event-date-to-date.php');
require_once(__DIR__ . '/dynamic-tags/event-date-next-date-DD-MM.php');
require_once(__DIR__ . '/dynamic-tags/event-pass-class.php');
require_once(__DIR__ . '/dynamic-tags/event-ticket-class.php');
require_once(__DIR__ . '/dynamic-tags/event-date-to-date-mobile.php');
require_once(__DIR__ . '/dynamic-tags/first-taxo-image-class.php');
require_once(__DIR__ . '/queries/search-filter.php');
require_once(__DIR__ . '/queries/current-events.php');
require_once(__DIR__ . '/queries/today-events.php');

function register_custom_tags($dynamic_tags_manager)
{

    require_once(__DIR__ . '/dynamic-tags/event-date-to-date.php');
    require_once(__DIR__ . '/dynamic-tags/event-date-next-date-DD-MM.php');
    require_once(__DIR__ . '/dynamic-tags/event-pass-class.php');
    require_once(__DIR__ . '/dynamic-tags/event-ticket-class.php');
    require_once(__DIR__ . '/dynamic-tags/event-date-to-date-mobile.php');
    require_once(__DIR__ . '/dynamic-tags/first-taxo-image-class.php');
    require_once(__DIR__ . '/queries/search-filter.php');
    require_once(__DIR__ . '/queries/current-events.php');
    require_once(__DIR__ . '/queries/today-events.php');


    $dynamic_tags_manager->register(new \Elementor_Dynamic_Tag_Next_Event_DATETIME);
    $dynamic_tags_manager->register(new \Elementor_Dynamic_Tag_Event_Date_To_Date);
    $dynamic_tags_manager->register(new \Elementor_Dynamic_Tag_Event_Ticket_Class);
    $dynamic_tags_manager->register(new \Elementor_Dynamic_Tag_Event_Pass_Class);
    $dynamic_tags_manager->register(new \Elementor_Dynamic_Tag_Event_Date_To_Date_Mobile);
    $dynamic_tags_manager->register(new \Elementor_Dynamic_Tag_Frist_Taxo_Image);

}

add_action('rest_event_query', function ($args, $request) {
    $month_year = $request->get_param('month'); // Récupérer le paramètre 'month' de la requête
    $meta_query = [];
    if (!empty($month_year)) {
        list($month, $year) = explode('-', $month_year);

        if (checkdate($month, 1, $year)) { // Vérifier si le mois et l'année sont valides
            $first_day = date('Y-m-d H:i:s', strtotime("$year-$month-01 00:00:00")); // Premier jour du mois à minuit
            $last_day = date('Y-m-t 23:59:59', strtotime("$year-$month-01")); // Dernier jour du mois à 23:59:59

            $meta_query = array(
                'relation' => 'AND',
                array(
                    'key' => 'dates$debut',
                    'compare' => '<=', // L'événement commence au plus tard le dernier jour du mois
                    'value' => $last_day,
                    'type' => 'DATETIME'
                ),
                array(
                    'key' => 'dates$fin',
                    'compare' => '>=', // L'événement se termine au plus tôt le premier jour du mois
                    'value' => $first_day,
                    'type' => 'DATETIME'
                )
            );
        }
    }

    $args['meta_query'] = $meta_query;
    $args['posts_per_page'] = 100;
    return $args;

}, 10, 2);
