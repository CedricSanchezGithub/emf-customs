import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from '@fullcalendar/moment';
import frLocale from '@fullcalendar/core/locales/fr';
import { styled } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyledBaseProps } from '../common/types';
import { DatesSetArg } from '@fullcalendar/core';
import { EmfFullCalendarEventView } from './emf-full-calendar-event.view';
import moment from 'moment';
import 'moment/locale/fr';




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

}


const EmfFullCalendarView = styled( ({ events, className, handleDatesChange, displayMode }: EmfFullCalendarViewProps) => {

  const calendarRef = useRef();
  const [eventToDisplay, setEventToDisplay]  =   useState()
  const eventDisplayHandler = (event)=> {
    setEventToDisplay(event);
  }
  const [tooltipsExcerpt, setTooltipsExcerpt] = useState("")
  const [tooltipsTitle, setTooltipsTitle] = useState("")
  const [tooltipsPosition, setTooltipsPosition] = useState({ x: 0, y: 0 });
  const [tooltipsHours, setTooltipsHours] = useState({ start: "" , end: "" });
  const [tooltipsImage, setTooltipsImage] = useState("");
  const [tooltipsStatus, setTooltipsStatus] = useState("");
  const [tooltipsDisplay, setTooltipsDisplay] = useState('None');
  const tooltipsRef = useRef(null);

  const chipsLabel = (tooltipsStatus === 'None' || tooltipsStatus === '') ? 'Maintenu' : tooltipsStatus;

  useEffect(() => {

    if (tooltipsRef.current) {
      tooltipsRef.current.style.top = `${tooltipsPosition.y}px`;
      tooltipsRef.current.style.left = `${tooltipsPosition.x}px`;
    }
  }, [tooltipsPosition]);

  const handleEventMouseEnter = (e) => {
    const mouseX = e.jsEvent.clientX;
    const mouseY = e.jsEvent.clientY;
    setTooltipsTitle(e.event.title)
    setTooltipsExcerpt(e.event.extendedProps.excerpt)
    setTooltipsHours({ start: moment(e.event.start).locale('fr').format('DD/MM H:mm'), end: moment(e.event.end).locale('fr').format('DD/MM H:mm') })
    setTooltipsImage(e.event.extendedProps.image)
    setTooltipsStatus(e.event.extendedProps.status)
    setTooltipsPosition({ x: mouseX, y: mouseY });
    setTooltipsDisplay('flex')
  };

  const handleEventMouseLeave = (e) => {
    setTooltipsDisplay('none')
  }


  return (

    <div className={className}>

      <FullCalendar

        plugins={[dayGridPlugin, momentPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventMouseLeave={handleEventMouseLeave}
        eventMouseEnter={handleEventMouseEnter}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        locale={frLocale}
        datesSet={handleDatesChange}
        showNonCurrentDates={false}
        dayHeaderFormat={{ weekday: 'long' }}
        firstDay={0}
        eventContent={

          (eventContent) => {
            return <EmfFullCalendarEventView eventContent={eventContent}
                                             anchorEl={calendarRef.current}
                                             displayMode={displayMode}
                                             eventDisplayHandler={eventDisplayHandler}
            />;
          }
        }
      />

      <div

        className={'myTooltips'}
        ref={tooltipsRef}
        style={{
          display: `${tooltipsDisplay}`,
          borderRadius: '20px',
          position: 'fixed',
          fontSize: '0.8rem',
          width: '250px',
          height: '500px',
          backgroundColor: '#F1F1F1',
          top: `${tooltipsPosition.x}`,
          left: `${tooltipsPosition.y}`,
          zIndex: '100',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          textOverflow: 'clip'
        }}>
          <img style={{ width: '100%', maxHeight: '50%' }} src={tooltipsImage} alt={tooltipsTitle} />
          <u style={{ backgroundColor: tooltipsStatus === 'None' || tooltipsStatus === '' ? 'green' : 'red' }}>{chipsLabel}</u>
        <h2 style={{ padding: '10px' }}>{tooltipsTitle}</h2>
        <span style={{ padding: '10px' }}>{'Du '} {tooltipsHours.start.toString()} {' à '} {tooltipsHours.end.toString()}</span>
        <span   style={{
          padding: '10px',
          display: '-webkit-box',
          WebkitLineClamp: '5',
          overflow: 'hidden',
          textOverflow: 'clip',
        }} dangerouslySetInnerHTML={{ __html: tooltipsExcerpt }} />
      </div>
    </div>
  )
})`
  & {
    font-family: "Space Grotesk", serif;
    .myTooltips{
      font-family: "Space Grotesk", serif;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

    }
    .myTooltips img{
      border-radius: 20px 20px 0 0;
      border-bottom: 1px solid gray;
    }
    .myTooltips u {
      text-align: center;
      border-radius: 0 0 20px 20px ;
      color: whitesmoke;
      padding: 10px;
      width: 50%;
      text-decoration: none;
      font-weight: bold;
      font-size: 1rem;
    }
    .myTooltips h2{
      font-size: 1rem;
      margin: 0;
      text-align: center;
    }
    .myTooltips p{
      margin: 0;
      overflow: clip;
      text-overflow: clip;
      display: -webkit-box;
    }
  }

`
export default EmfFullCalendarView;
