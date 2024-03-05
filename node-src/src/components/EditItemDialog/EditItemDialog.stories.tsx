import type { Meta, StoryObj } from '@storybook/react';
import { EditItemDialog } from '.';
import { ItemStatus } from '@ui/types';

const meta = {
  title: 'Components/EditDialog',
  component: EditItemDialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {}
} satisfies Meta<typeof EditItemDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    item: {
      id: 'abacsdf34243',
      title: 'test',
      releaseDate: 'string',
      itemStatus: ItemStatus.Decided,
      statusName: 'string',
      description: 'string',
      location: 'string',
      imagePath: 'string',
      recipient: 'string'
    }
  }
};
