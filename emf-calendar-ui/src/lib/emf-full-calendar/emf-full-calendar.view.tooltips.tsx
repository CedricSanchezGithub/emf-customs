// import { styled } from '@mui/material';
// import { useRef, useState } from 'react';
// import { StyledBaseProps } from '../common/types';
// import { EventContentArg } from '@fullcalendar/core';
//
// interface EmfFullCalendarViewTooltips extends StyledBaseProps  {
//
//
//   eventContent : EventContentArg
//   tooltipsPosition: {x: number; y: number}
//
//
// }
//
// export const EmfFullCalendarViewTooltips = styled (
//
//   ({eventContent, className, tooltipsPosition} : EmfFullCalendarViewTooltips) => {
//
//     const statusColor: "green" | "red" = (eventContent.event.extendedProps.status === 'None' || eventContent.event.extendedProps.status === '') ? 'green' : 'red';
//     const chipsLabel = (eventContent.event.extendedProps.status === 'None' || eventContent.event.extendedProps.status === '') ? 'Maintenu' : eventContent.event.extendedProps.status;
//     const statusBackground: "success" | "error" = (eventContent.event.extendedProps.status === 'None' || eventContent.event.extendedProps.status === '') ? 'success' : "error";
//     const styledTitle = (eventContent.event.start.getDay() === eventContent.event.end.getDay()) ? "" : '#eeeeee'
//     const linkRef = useRef();
//
//
//     return (
//       <div>
//         <div className="hover-block" style={{ top: tooltipsPosition.y, left: tooltipsPosition.x }}>
//           <span className={className}></span>
//           <h2>{eventContent.event.title}</h2>
//           <p>{eventContent.event.extendedProps.excerpt}</p>
//           <span>{eventContent.event.extendedProps.start} - {eventContent.event.extendedProps.end}</span>
//         </div>
//       </div>
//
//     )
//   })`
//   &{
//     .hover-block {
//       position: fixed;
//       height: 100px;
//       width: 100px;
//       background-color: black;
//       border: 1px solid #ccc;
//       padding: 10px;
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//       z-index: 1000;
//     }
//
//
//   }
// `
