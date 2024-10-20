import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NewProjectPayload } from '@types';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectsFacade } from '@state';

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
  styleUrl: './new-project.component.scss',
})
export class NewProjectComponent {
  projectForm = this.fb.group({
    projectName: this.fb.nonNullable.control(''),
  });

  constructor(
    private fb: FormBuilder,
    private projectFacade: ProjectsFacade
  ) {}

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
