import type { Meta, StoryObj } from '@storybook/react';
import { BidDialog } from '.';

const meta = {
  title: 'Components/BidDialog',
  component: BidDialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {}
} satisfies Meta<typeof BidDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    item: {
      id: 0,
      title: 'some item',
      description: 'some description',
      itemStatus: 0,
      statusName: 'Undecided',
      releaseDate: Date.now().toString(),
      fileKeys: [],
      fileUrls: [],
      bids: []
    },
    user: { id: '1ad9a8d7f134', firstName: 'John', lastName: 'Doe', emailAddress: 'john@doe.com' },
    onSubmit: () => {
      console.log('empty');
    }
  }
};
