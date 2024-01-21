import type { Meta, StoryObj } from '@storybook/react';
import { Bidding } from '.';

const meta = {
  title: 'Components/Bidding',
  component: Bidding,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onSubmit: { action: 'onSubmit' }
  }
} satisfies Meta<typeof Bidding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    form: { itemId: 'some-908234asdflkajsdrf-2345', bid: null, date: null },
    onSubmit: (form) => {
      console.log(form);
    }
  }
};

export const Prefilled: Story = {
  args: {
    form: { itemId: 'some-908234asdflkajsdrf-2345', bid: 5, date: '2025-01-01' },
    onSubmit: (form) => {
      console.log(form);
    }
  }
};
