import type { Meta, StoryObj } from '@storybook/react';
import { ItemForm } from '.';
import { ItemStatus } from '@ui/types';
import { format } from 'date-fns';

const meta = {
  title: 'Components/ItemForm',
  component: ItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onChange: { action: 'onChange' }
  }
} satisfies Meta<typeof ItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewItem: Story = {
  args: {
    item: {
      id: 1,
      title: '',
      description: '',
      releaseDate: format(new Date(), 'yyyy-MM-dd'),
      location: '',
      itemStatus: 0,
      statusName: ItemStatus[ItemStatus.Undecided]
    },
    onChange: () => {
      // TODO:
    },
    uploadFile: () => {
      // TODO:
    }
  }
};

export const EditItem: Story = {
  args: {
    item: {
      id: 0,
      title: 'Existing item with title',
      description: 'Existing item description',
      releaseDate: '2025-01-01',
      location: 'Somewhere in BFE',
      itemStatus: 1,
      statusName: ItemStatus[ItemStatus.Decided]
    },
    onChange: () => {
      // TODO:
    },
    uploadFile: () => {
      // TODO:
    }
  }
};
