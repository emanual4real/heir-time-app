import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '.';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {}
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    itemCount: 1,
    itemsPerPage: 2,
    children: [<h1 key="1">Item 1</h1>, <h2 key="2">Item 2</h2>]
  }
};
