import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsFacade } from '@state';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css',
})
export class ViewProjectComponent {
  currentProject$ = this.projectFacade.currentProject$;

  constructor(private projectFacade: ProjectsFacade) {}
}
