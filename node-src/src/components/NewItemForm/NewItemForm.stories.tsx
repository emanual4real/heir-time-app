import type { Meta, StoryObj } from '@storybook/react';
import { NewItemForm } from '.';

const meta = {
  title: 'Components/NewItemForm',
  component: NewItemForm,
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
} satisfies Meta<typeof NewItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    onSubmit: (form) => {
      console.log(form);
    }
  }
};