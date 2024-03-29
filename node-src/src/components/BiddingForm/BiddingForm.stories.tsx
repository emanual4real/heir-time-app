import type { Meta, StoryObj } from '@storybook/react';
import { BiddingForm } from '.';

const meta = {
  title: 'Components/Bidding',
  component: BiddingForm,
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
} satisfies Meta<typeof BiddingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    onChange: () => {
      // TODO:
    }
  }
};

export const Prefilled: Story = {
  args: {
    bid: {
      value: 10,
      receivingDate: '2025-01-01',
      user: '102391230',
      createdAt: Date.now().toString()
    },
    onChange: () => {
      // TODO:
    }
  }
};
