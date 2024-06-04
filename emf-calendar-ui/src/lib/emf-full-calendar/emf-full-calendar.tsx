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

  const [events, setEvents] = useState<EmfEvent[]>([])
  const [whichGridDay, setWhichGridDay] = useState<string>("")

  function handleDatesChange(info : DatesSetArg) {

    const eventDate = moment(info.startStr)
    const formatedMonth = moment(eventDate).format('MM-YYYY')
    setWhichGridDay(info.view.type)
    fetchEvents(formatedMonth)
  }

  const fetchEvents = async (monthDate : string) => {
    try {
      const response = await fetch(`${props.api}?month=${monthDate}`);
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      const results = data.flatMap((e) => {

        if (e.acf?.dates?.length) {
          return e.acf.dates.map((date: { debut: moment.MomentInput; fin: moment.MomentInput; statut: string; }) => {
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

      setEvents(results)

    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  };

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
                              displayMode={whichGridDay}
                              {...props} />;
}

/**
 * Exposing props to elementor through the web component
 * /!\ o not use this for state management
 */
EmfFullCalendar.propTypes = EmfFullCalendarPropsTypes;
