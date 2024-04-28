import type { Meta, StoryObj } from '@storybook/react';
import { withActions } from '@storybook/addon-actions/decorator';
import { Dialog } from '.';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  decorators: [withActions],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' }
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    buttonText: { control: 'text', description: 'title of the button to open dialog' },
    dialogTitle: { control: 'text', description: 'title of the dialog box' },
    submitDisabled: { control: 'boolean', description: 'disable the submit button' }
  }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    buttonText: 'Open dialog',
    children: <h1>I&apos;m a child component</h1>,
    dialogTitle: 'Storybook dialog title',
    submitDisabled: false,
    onSubmit: () => {
      console.log('test');
    }
  }
};
