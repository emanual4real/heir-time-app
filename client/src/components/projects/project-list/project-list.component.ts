import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ProjectsFacade } from '@state';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  projects$ = this.projectFacade.projects$;
  currentProject$ = this.projectFacade.currentProject$;
  selectedProjectName$ = this.currentProject$.pipe(
    map((project) => {
      if (project === null) {
        return 'No project selected';
      }

      return project.projectName;
    })
  );

  constructor(private projectFacade: ProjectsFacade) {}

  isCurrentProject$(projectId: string) {
    return this.currentProject$.pipe(
      map((project) => {
        if (project !== null && project.id === projectId) {
          return true;
        }
        return false;
      })
    );
  }

  setCurrentProject(projectId: string) {
    this.projectFacade.setCurrentProject(projectId);
  }
}
