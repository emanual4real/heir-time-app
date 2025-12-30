import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectsFacade } from '@state';
import { map } from 'rxjs';
import { NewItemComponent } from '../../items';
import { DeleteProjectComponent } from '../delete-project';
import { NewProjectComponent } from '../new-project';
import { ProjectListComponent } from '../project-list';
import { ViewProjectComponent } from '../view-project';

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [
    CommonModule,
    NewProjectComponent,
    DeleteProjectComponent,
    NewItemComponent,
    ProjectListComponent,
    ViewProjectComponent,
    MatTabsModule,
  ],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.css',
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

  projectNameList$ = this.projects$.pipe(map((data) => data.map((row) => row.projectName)));

  constructor(private projectFacade: ProjectsFacade) {}
}
