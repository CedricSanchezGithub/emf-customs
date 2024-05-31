import { Card, CardContent, CardMedia, Chip, Link, ListItem, styled, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useRef } from 'react';
import moment from 'moment/moment';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { TimelineContent, TimelineDot } from '@mui/lab';
import { StyledBaseProps } from '../common/types';
import { EventContentArg } from '@fullcalendar/core';

interface EmfFullCalendarEventViewProps extends StyledBaseProps  {

  eventContent : EventContentArg
  anchorEl: HTMLDivElement
  displayMode: string
  eventDisplayHandler: (event) => void

}


export const EmfFullCalendarEventView = styled (


  ({eventContent, className, displayMode} : EmfFullCalendarEventViewProps) => {

    const statusColor : "green" | "red" = (eventContent.event.extendedProps.status === 'None' || eventContent.event.extendedProps.status === '') ? 'green' : 'red';
    const chipsLabel = (eventContent.event.extendedProps.status === 'None' || eventContent.event.extendedProps.status === '') ? 'Maintenu' : eventContent.event.extendedProps.status;
    const statusBackground :"success" | "error"  = (eventContent.event.extendedProps.status === 'None' || eventContent.event.extendedProps.status === '') ? 'success' : "error";
    const startDay = eventContent.event.start ? eventContent.event.start.getDay() : null;
    const endDay = eventContent.event.end ? eventContent.event.end.getDay() : null;
    const styledTitle = (startDay !== null && endDay !== null && startDay === endDay && eventContent.event.title) ? "" : '#eeeeee';
    const linkRef = useRef();


    return (
      <div className={className} ref={linkRef} style={{textDecoration: 'none', whiteSpace: 'nowrap'}}>
        <Link href={eventContent.event.extendedProps.link} target={"_blank"} width={"100%"} style={{textDecoration: 'none', textOverflow: 'ellipsis'}} >


          <Tooltip
            slotProps={{ popper: { disablePortal : true }}}
            title={
              <Card sx={{ whiteSpace: 'wrap'}}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={eventContent.event.extendedProps.image}
                  title={eventContent.event.title}
                />
                <CardContent >
                  {eventContent.event.extendedProps.status && (
                    <React.Fragment>
                      <Chip color={statusBackground} label={chipsLabel} size='small' />
                      <br/>
                    </React.Fragment>
                  )}
                  <Typography gutterBottom variant="subtitle1" component="div">
                        <span
                          dangerouslySetInnerHTML={{ __html: eventContent.event.title}}
                        />
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span
                          dangerouslySetInnerHTML={{ __html: eventContent.event.extendedProps.excerpt}}
                        />
                    <br/>
                    Début: {moment(eventContent.event.start).format('H[h]')} / {moment(eventContent.event.start).format('DD-MM-YYYY')}<br/>
                    Fin: {moment(eventContent.event.end).format('H[h]')} / {moment(eventContent.event.end).format('DD-MM-YYYY')}
                  </Typography>
                </CardContent>
              </Card>}>

            <div style={{ zIndex: -10}}>

              <ListItem
              >
                <TimelineSeparator>
                  <TimelineDot style={{ backgroundColor: statusColor }} />
                </TimelineSeparator>
                <TimelineContent
                  className="event-content"
                  sx={{ color: styledTitle, zIndex: -10 }}
                >
                  {moment(eventContent.event.start).format('H[h] ')}
                  {displayMode === 'dayGridDay' ? moment(eventContent.event.end).format('H[h] ') : ''}
                  <span
                    dangerouslySetInnerHTML={{ __html: eventContent.event.title }}
                  />
                </TimelineContent>
              </ListItem>
            </div>
          </Tooltip>
        </Link>
      </div>
    )
  })`
  & {
    .fc-daygrid-day-events {
      max-height: 10px;
    }

    .event-content {
      font-size: 0.8rem;
      padding: 0 5px;
      z-index: -10;
    }

    .MuiListItem-root {
      padding: 0;
      height: 1rem;
    }
    .event-content {
      font-size: 0.8rem;
      padding: 0 5px;
      position: relative;
    }

    .fc-daygrid-event-harness{

      z-index: 0 !important;

    }

    .fc-daygrid-event-harness-abs{

      z-index: 0 !important;

    }

    .tooltip {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px;

      /* Position the tooltip */
      position: absolute;
    }
    .tooltip .tooltiptext img {
      width: 100px;
      height: 100px;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      position: fixed;
      left: 50%;
      top: 50%;
    }
  }
`


