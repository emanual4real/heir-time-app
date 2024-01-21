import type { Meta, StoryObj } from '@storybook/react';
import { Item } from '.';
import { ItemStatus } from '../../types/enums/ItemStatus';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Item',
  component: Item,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {}
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Undecided: Story = {
  args: {
    title: 'Used Couch',
    description:
      'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
    imagePath: '/couch.jpg',
    releaseDate: '1/1/2025',
    location: 'Madison County, N.C.',
    status: ItemStatus.Undecided
  }
};

export const Decided: Story = {
  args: {
    title: 'Used Couch',
    description:
      'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
    imagePath: '/couch.jpg',
    releaseDate: '1/1/2025',
    location: 'Madison County, N.C.',
    status: ItemStatus.Decided,
    recipient: 'Emanual'
  }
};

export const Goodwill: Story = {
  args: {
    title: 'Used Couch',
    description:
      'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
    imagePath: '/couch.jpg',
    releaseDate: '1/1/2025',
    location: 'Madison County, N.C.',
    status: ItemStatus.Goodwill
  }
};
