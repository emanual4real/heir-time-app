import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectsFacade } from '@state';
import { NewProjectPayload } from '@types';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css',
})
export class NewProjectComponent {
  projectForm = this.fb.group({
    projectName: this.fb.nonNullable.control(''),
  });

  constructor(private fb: FormBuilder, private projectFacade: ProjectsFacade) {}

  createProject() {
    const newProject: NewProjectPayload = {
      projectName: this.projectForm.controls.projectName.value,
      admins: [],
      users: [],
      items: [],
    };
    this.projectFacade.createProject(newProject);
    this.projectForm.reset();
  }
}
