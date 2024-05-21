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

/**
 * Gère la modification de la requête API REST pour les événements en fonction du paramètre 'month'.
 * Cette fonction est accrochée à l'action 'rest_event_query'.
 *
 * @param array $args Les arguments de la requête WP_Query existante.
 * @param WP_REST_Request $request La requête REST actuelle.
 * @return array Les arguments modifiés de la requête.
 */

add_action('rest_event_query', function ($args, $request) {
  // Récupère le paramètre 'month' de la requête, qui doit être au format MM-YYYY.
  $month_year = $request->get_param('month');

  // Initialise le tableau pour les requêtes meta_query de WP.
  $meta_query = [];

  // Vérifie si le paramètre 'month' n'est pas vide.
  if (!empty($month_year)) {
      // Sépare le mois et l'année.
      list($month, $year) = explode('-', $month_year);

      // Vérifie si la combinaison de mois et année est valide.
      if (checkdate($month, 1, $year)) {
          // Calcule le premier jour du mois spécifié.
          $first_day = date('Y-m-d H:i:s', strtotime("$year-$month-01 00:00:00"));
          // Calcule le dernier jour du mois spécifié.
          $last_day = date('Y-m-t 23:59:59', strtotime("$year-$month-01"));

          // Construit la requête meta_query pour trouver les événements qui commencent ou finissent dans le mois donné.
          // $meta_query[] = array(
          //     'relation' => 'OR',
          //     array(
          //         'relation' => 'AND',
          //         array(
          //             'key'     => 'dates$debut', // Clé meta pour la date de début.
          //             'compare' => '>=',          // Comparaison pour s'assurer que la date de début est après ou égale au premier jour du mois.
          //             'value'   => $first_day,    // Valeur du premier jour du mois.
          //             'type'    => 'DATETIME'     // Type de données pour la comparaison.
          //         ),
          //         array(
          //             'key'     => 'dates$fin',   // Clé meta pour la date de fin.
          //             'compare' => '<=',          // Comparaison pour s'assurer que la date de fin est avant ou égale au dernier jour du mois.
          //             'value'   => $last_day,     // Valeur du dernier jour du mois.
          //             'type'    => 'DATETIME'     // Type de données pour la comparaison.
          //         )
          //     ),
          //     array(
          //         'relation' => 'AND',
          //         array(
          //             'key'     => 'dates$debut', // Clé meta pour la date de début (répétée pour couvrir tous les scénarios possibles).
          //             'compare' => '>=',          // Comparaison pour s'assurer que la date de début est après ou égale au premier jour du mois.
          //             'value'   => $first_day,    // Valeur du premier jour du mois.
          //             'type'    => 'DATETIME'     // Type de données pour la comparaison.
          //         ),
          //         array(
          //             'key'     => 'dates$fin',   // Clé meta pour la date de fin (répétée pour couvrir tous les scénarios possibles).
          //             'compare' => '<=',          // Comparaison pour s'assurer que la date de fin est avant ou égale au dernier jour du mois.
          //             'value'   => $last_day,     // Valeur du dernier jour du mois.
          //             'type'    => 'DATETIME'     // Type de données pour la comparaison.
          //         )
          //     )
          // );
          $meta_query = array(
            'relation' => 'AND',
            array(
                'key' => 'dates_debut',
                'compare' => '<=', // L'événement commence au plus tard le dernier jour du mois
                'value' => $last_day,
                'type' => 'DATETIME'
            ),
            array(
                'key' => 'dates_fin',
                'compare' => '>=', // L'événement se termine au plus tôt le premier jour du mois
                'value' => $first_day,
                'type' => 'DATETIME'
            )
        );
      }
  }

  // Ajoute la meta_query modifiée aux arguments de la requête principale.
  $args['meta_query'] = $meta_query;

  // Retourne les arguments modifiés pour appliquer ces critères de filtrage.
  return $args;

}, 10, 2); // Priorité et nombre de paramètres acceptés par le callback.
