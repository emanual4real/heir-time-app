import { createLazyFileRoute } from '@tanstack/react-router';
import { Project } from '@ui/pages';

export const Route = createLazyFileRoute('/projects')({
  component: Project
});
