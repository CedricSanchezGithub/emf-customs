import { Link, ListItem, styled } from '@mui/material';
import * as React from 'react';
import { Dispatch, SetStateAction, useRef } from 'react';
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
    const momentStartDay = eventContent.event.start ? moment(eventContent.event.start) : null
    let momentEndDay = eventContent.event.end ? moment(eventContent.event.end) : null

    if (momentEndDay === null) { momentEndDay = momentStartDay }

    const styledTitle = (momentStartDay !== null && momentEndDay !== null && momentStartDay.format('YYYY-MM-DD') === momentEndDay.format('YYYY-MM-DD') && eventContent.event.title) ? "" : '#eeeeee';

    return (
      <div className={className} style={{textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'clip'}} >
        <Link href={eventContent.event.extendedProps.link} target={"_blank"} width={"100%"} style={{textDecoration: 'none'}} >
          <ListItem>
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
  }
`


