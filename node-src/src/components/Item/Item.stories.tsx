import type { Meta, StoryObj } from '@storybook/react';
import { ItemStatus } from '../../types/enums/ItemStatus';
import { ItemComponent } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Item',
  component: ItemComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {}
} satisfies Meta<typeof ItemComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Undecided: Story = {
  args: {
    item: {
      id: 'some id',
      title: 'Used Couch',
      description:
        'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
      imagePath: '/couch.jpg',
      releaseDate: '1/1/2025',
      location: 'Madison County, N.C.',
      itemStatus: ItemStatus.Undecided
    }
  }
};

export const Decided: Story = {
  args: {
    item: {
      id: 'some id',
      title: 'Used Couch',
      description:
        'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
      imagePath: '/couch.jpg',
      releaseDate: '1/1/2025',
      location: 'Madison County, N.C.',
      itemStatus: ItemStatus.Decided,
      recipient: 'Emanual'
    }
  }
};

export const Goodwill: Story = {
  args: {
    item: {
      id: 'some id',
      title: 'Used Couch',
      description:
        'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
      imagePath: '/couch.jpg',
      releaseDate: '1/1/2025',
      location: 'Madison County, N.C.',
      itemStatus: ItemStatus.Goodwill
    }
  }
};