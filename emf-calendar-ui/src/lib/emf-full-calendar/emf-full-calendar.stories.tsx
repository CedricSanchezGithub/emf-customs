import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { EmfFullCalendar } from './emf-full-calendar';
import { CustomProviders } from '../config/providers';
import React from 'react';

const Story: ComponentMeta<typeof EmfFullCalendar> = {
  component: EmfFullCalendar,
  title: 'EmfCalendarTitle',

};
export default Story;

const Template: ComponentStory<typeof EmfFullCalendar> = (args) => (
  <CustomProviders>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
    </style>
    <EmfFullCalendar {...args} />
  </CustomProviders>
);



export const Primary = Template.bind({});
Primary.args = { startEventDateFormat: 'YYYY-MM-DD hh:mm:ss',
  endEventDateFormat: 'YYYY-MM-DD hh:mm:ss',
  api: 'https://emfv2.betrue.fr/wp-json/wp/v2/events' };

//https://emfv2.betrue.fr/wp-json/wp/v2/events?month=
