import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { NewProjectComponent } from '../new-project';
import { NewItemComponent } from 'src/components/items';
import { ProjectsFacade } from '@state';
import { DeleteProjectComponent } from '../delete-project';
import { ViewProjectComponent } from '../view-project';
import { ProjectListComponent } from '../project-list';

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [
    CommonModule,
    NewProjectComponent,
    DeleteProjectComponent,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    NewItemComponent,
    ReactiveFormsModule,
    ProjectListComponent,
    ViewProjectComponent,
  ],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss',
})
export class ProjectHomeComponent {
  // item: Item = {
  //   id: 1,
  //   title: 'Some Shiba Inu',
  //   releaseDate: '10/16/2024',
  //   itemStatus: ItemStatus.Decided,
  //   statusName: 'Decided',
  //   description: 'Just a dog',
  //   location: 'Asheville, NC',
  //   imagePath: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //   recipient: 'some one',
  //   bids: [],
  //   fileKeys: [],
  //   fileUrls: [],
  // };

  projects$ = this.projectFacade.projects$;

  projectNameList$ = this.projects$.pipe(
    map((data) => data.map((row) => row.projectName))
  );

  constructor(private projectFacade: ProjectsFacade) {}
}
