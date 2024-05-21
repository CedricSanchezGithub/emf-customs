import PropTypes, { InferProps } from 'prop-types';
import EmfFullCalendarView from './emf-full-calendar.view';
import moment from 'moment';
import { useState } from 'react';
import { DatesSetArg } from '@fullcalendar/core';

export const EmfFullCalendarPropsTypes = {
  startEventDateFormat: PropTypes.string,
  endEventDateFormat: PropTypes.string,
  api: PropTypes.string
};

export type EmfFullCalendarProps = InferProps<
  typeof EmfFullCalendarPropsTypes
>;



export interface EmfEvent {

  title: string
  start: string
  end: string
  status: string
  excerpt: string
  link: string
  image:string

}


export function EmfFullCalendar(props: EmfFullCalendarProps) {

  const [tooltipsPosition, setTooltipsPosition] = useState({ x: 0, y: 0 });

  const [events, setEvents] = useState<EmfEvent[]>([])
  const [whichGridDay, setWhichGridDay] = useState<string>("")

  function handleDatesChange(info : DatesSetArg) {

    const eventDate = moment(info.startStr)
    const formatedMonth = moment(eventDate).format('MM-YYYY')
    console.log("formatedMonth : " + formatedMonth);

    const whichGridDay = info.view
    setWhichGridDay(info.view.type)
    console.log('isDayGrid');
    console.log(whichGridDay.type);

    fetchEvents(formatedMonth)
  }


  const handleEventMouseEnter = (e) => {
    const mouseEvent = e.jsEvent;
    const mouseX = mouseEvent.clientX;
    const mouseY = mouseEvent.clientY;

    // setTooltipsPosition({ x: e.clientX, y: e.clientY });

    console.log('Position de la souris:', { x: mouseX, y: mouseY });
    console.log('mouseEvent:', { mouseEvent });
  };


  const fetchEvents = async (monthDate : string) => {
    try {
      const startTime = Date.now()
      const response = await fetch(`${props.api}?month=${monthDate}`);
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      const results = data.flatMap((e) => {

        if (e.acf?.dates?.length) {
          return e.acf.dates.map((date: { debut: moment.MomentInput; fin: moment.MomentInput; statut: string; }) => {
              console.log(date.statut)
            const event = {
              title: e.title.rendered,
              link: e.link,
              start: moment(date.debut).toISOString(),
              end: moment(date.fin).toISOString() === moment(date.debut).toISOString() ? moment(date.fin).toISOString() + 1 : moment(date.fin).toISOString(),
              excerpt: e.excerpt.rendered,
              image: e.yoast_head_json.schema["@graph"][1].contentUrl,
              status: date.statut,
            };
            return event;
          });
        } else {

          return [];

        }
      });
      const endTime = Date.now();
      console.log(`Fetch time: ${endTime - startTime}ms`);
      console.log(`total results: ${results.length}`);
      console.log(results);
      setEvents(results)

    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  };


  const mockEvent = {
        "events": [
          {
            "title": "Concert Symphonique",
            "link": "https://example.com/concert-symphonique",
            "start": "2024-05-15T19:00:00.000Z",
            "end": "2024-05-15T21:00:00.000Z",
            "excerpt": "Un concert symphonique avec un programme varié, interprété par des musiciens talentueux.",
            "image": "https://example.com/images/concert-symphonique.jpg",
            "status": "None"
          },
          {
            "title": "Pièce de Théâtre",
            "link": "https://example.com/piece-de-theatre",
            "start": "2024-05-20T20:00:00.000Z",
            "end": "2024-05-20T22:30:00.000Z",
            "excerpt": "Une pièce de théâtre captivante, mettant en scène un drame contemporain.",
            "image": "https://example.com/images/piece-de-theatre.jpg",
            "status": "Reporté"
          },
          {
            "title": "Gala de Danse",
            "link": "https://example.com/gala-de-danse",
            "start": "2024-05-25T18:30:00.000Z",
            "end": "2024-05-25T21:00:00.000Z",
            "excerpt": "Un gala de danse présentant divers styles, allant du classique au contemporain.",
            "image": "https://example.com/images/gala-de-danse.jpg",
            "status": "Annulé"
          },
          {
            "title": "Stand-Up Comédie",
            "link": "https://example.com/stand-up-comedie",
            "start": "2024-05-10T20:00:00.000Z",
            "end": "2024-05-10T22:00:00.000Z",
            "excerpt": "Une soirée de stand-up hilarante avec les meilleurs comédiens.",
            "image": "https://example.com/images/stand-up-comedie.jpg",
            "status": "None"
          },
          {
            "title": "Festival de Jazz",
            "link": "https://example.com/festival-jazz",
            "start": "2024-05-18T16:00:00.000Z",
            "end": "2024-05-18T20:00:00.000Z",
            "excerpt": "Un festival présentant les meilleurs talents du jazz local et international.",
            "image": "https://example.com/images/festival-jazz.jpg",
            "status": "None"
          },
          {
            "title": "Opéra Classique",
            "link": "https://example.com/opera-classique",
            "start": "2024-05-23T19:30:00.000Z",
            "end": "2024-05-23T22:00:00.000Z",
            "excerpt": "Une performance classique d'opéra avec un ensemble talentueux.",
            "image": "https://example.com/images/opera-classique.jpg",
            "status": "None"
          },
          {
            "title": "Concert de Pop",
            "link": "https://example.com/concert-pop",
            "start": "2024-05-28T19:00:00.000Z",
            "end": "2024-05-28T21:30:00.000Z",
            "excerpt": "Un concert pop avec des tubes entraînants.",
            "image": "https://example.com/images/concert-pop.jpg",
            "status": "Annulé"
          },
          {
            "title": "Festival de Cinéma",
            "link": "https://example.com/festival-cinema",
            "start": "2024-05-30T15:00:00.000Z",
            "end": "2024-05-30T23:00:00.000Z",
            "excerpt": "Un festival mettant en avant les meilleurs films indépendants.",
            "image": "https://example.com/images/festival-cinema.jpg",
            "status": "Reporté"
          },
          {
            "title": "Groupe Acoustique",
            "link": "https://example.com/groupe-acoustique",
            "start": "2024-05-05T17:00:00.000Z",
            "end": "2024-05-05T19:30:00.000Z",
            "excerpt": "Un groupe acoustique interprétant des classiques et de nouveaux morceaux.",
            "image": "https://example.com/images/groupe-acoustique.jpg",
            "status": "Reporté"
          },
          {
            "title": "Soirée Classique",
            "link": "https://example.com/soiree-classique",
            "start": "2024-05-09T18:30:00.000Z",
            "end": "2024-05-09T20:30:00.000Z",
            "excerpt": "Une soirée classique pour les amateurs de musique élégante.",
            "image": "https://example.com/images/soiree-classique.jpg",
            "status": "Reporté"
          }
        ]
      }



  const calendarEvent = events.map(  (e) =>
    (
      {
        ...e,
        start: moment(e.start, props.startEventDateFormat).toISOString(),
        end: moment(e.end, props.endEventDateFormat).toISOString()
      }
    )
  )

  return <EmfFullCalendarView events={calendarEvent}
                              handleDatesChange={handleDatesChange}
                              handleEventMouseEnter={handleEventMouseEnter}
                              displayMode={whichGridDay}

                              {...props} />;
}

/**
 * Exposing props to elementor through the web component
 * /!\ o not use this for state management
 */
EmfFullCalendar.propTypes = EmfFullCalendarPropsTypes;
