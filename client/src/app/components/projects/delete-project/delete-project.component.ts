import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectsFacade } from '@state';

@Component({
  selector: 'app-delete-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.css',
})
export class DeleteProjectComponent {
  projects$ = this.projectFacade.projects$;
  constructor(private projectFacade: ProjectsFacade) {}

  deleteProject(projectId: string) {
    this.projectFacade.deleteProject(projectId);
  }
}
