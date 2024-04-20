import type { Meta, StoryObj } from '@storybook/react';
import { ItemStatus } from '@ui/types';
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
      id: 0,
      title: 'Used Couch',
      description:
        'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
      imagePath: '/couch.jpg',
      releaseDate: '2025-01-01T00:00:00Z',
      location: 'Madison County, N.C.',
      itemStatus: ItemStatus.Undecided,
      statusName: 'Undecided',
      bids: [
        {
          value: 10,
          receivingDate: '2025-01-01T00:00:00Z',
          user: 'Emanual Henry',
          createdAt: Date.now().toString()
        },
        {
          value: 1,
          receivingDate: '2025-01-01T00:00:00Z',
          user: 'Danaan Henry',
          createdAt: Date.now().toString()
        },
        {
          value: 5,
          receivingDate: '2025-01-01T00:00:00Z',
          user: 'Cady Henry',
          createdAt: Date.now().toString()
        }
      ],
      fileKeys: [],
      fileUrls: []
    },
    projectId: 'asdf987234sdaf'
  }
};

export const Decided: Story = {
  args: {
    item: {
      id: 1,
      title: 'Used Couch',
      description:
        'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
      imagePath: '/couch.jpg',
      releaseDate: '2025-01-01T00:00:00Z',
      location: 'Madison County, N.C.',
      itemStatus: ItemStatus.Decided,
      recipient: 'Emanual',
      statusName: 'Decided',
      bids: [],
      fileKeys: [],
      fileUrls: []
    },
    projectId: 'asdf987234sdaf'
  }
};

export const Goodwill: Story = {
  args: {
    item: {
      id: 2,
      title: 'Used Couch',
      description:
        'This couch has been used by a lot of people.  It gets around a lot.  I mean a lot!',
      imagePath: '/couch.jpg',
      releaseDate: '2025-01-01T00:00:00Z',
      location: 'Madison County, N.C.',
      itemStatus: ItemStatus.Goodwill,
      statusName: 'Goodwill',
      bids: [],
      fileKeys: [],
      fileUrls: []
    },
    projectId: 'asdf987234sdaf'
  }
};
