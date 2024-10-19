import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '@services';
import { NewProjectPayload } from '@types';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css',
})
export class NewProjectComponent {
  projectForm = this.fb.group({
    projectName: this.fb.nonNullable.control(''),
  });

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {}

  createProject() {
    const newProject: NewProjectPayload = {
      projectName: this.projectForm.controls.projectName.value,
      admins: [],
      users: [],
      items: [],
    };
    this.projectService.createProject(newProject);
    this.projectForm.reset();
  }
}
