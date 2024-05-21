import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from '@fullcalendar/moment';
import frLocale from '@fullcalendar/core/locales/fr';
import { styled } from '@mui/material';
import * as React from 'react';
import { StyledBaseProps } from '../common/types';
import { DatesSetArg } from '@fullcalendar/core';
import { EmfFullCalendarEventView } from './emf-full-calendar-event.view';
import { useRef, useState } from 'react';


interface EmfEvent {

  title: string
  start: string
  end: string
  image: string
  excerpt: string
  link: string
  status: string

}



interface EmfFullCalendarViewProps extends StyledBaseProps{

  events: EmfEvent[],
  handleDatesChange: (arg: DatesSetArg) => void
  displayMode: string
  handleEventMouseEnter: (e) => void

}



const EmfFullCalendarView = styled( ({ events, className, handleDatesChange, displayMode, handleEventMouseEnter }: EmfFullCalendarViewProps) => {

  const calendarRef = useRef();

  const [eventToDisplay, setEventToDisplay]  =   useState()

  const eventDisplayHandler = (event)=> {

    setEventToDisplay(event)

  }

  return (

    <div className={className}>
      <span ref={calendarRef}></span>

      {/*{eventToDisplay? (<div className="tooltipsCustom">*/}

      {/*  {JSON.stringify(eventToDisplay)}*/}

      {/*</div>) : ""}*/}


      <FullCalendar

        plugins={[dayGridPlugin, momentPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventMouseEnter={ eventDisplayHandler }
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        locale={frLocale}
        datesSet={ handleDatesChange }
        showNonCurrentDates={false}
        dayHeaderFormat={{weekday: 'long'}}
        firstDay={0}
        eventContent={

          (eventContent) => {
            return <EmfFullCalendarEventView eventContent={eventContent}
                                             anchorEl={calendarRef.current}
                                             displayMode={displayMode}
                                             eventDisplayHandler={eventDisplayHandler}
            />
          }
        }
      />
    </div>
  )
})`
  &{
    font-family: "Space Grotesk",serif;
  }
  .tooltipsCustom{
    position: fixed;
    top: 50%;
    left: 50%;
  }
  .fc-daygrid-event-harness{
    z-index: 0 !important;
  }

`
export default EmfFullCalendarView;
