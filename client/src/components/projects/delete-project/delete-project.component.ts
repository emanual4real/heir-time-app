import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsFacade } from '@state';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-project',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.scss',
})
export class DeleteProjectComponent {
  projects$ = this.projectFacade.projects$;
  constructor(private projectFacade: ProjectsFacade) {}

  deleteProject(projectId: string) {
    this.projectFacade.deleteProject(projectId);
  }
}
