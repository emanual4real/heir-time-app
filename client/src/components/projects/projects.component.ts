import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item';
import { ItemStatus } from '@types';
import { Item } from 'src/types/models/item';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  item: Item = {
    id: 1,
    title: 'Some Shiba Inu',
    releaseDate: '10/16/2024',
    itemStatus: ItemStatus.Decided,
    statusName: 'Decided',
    description: 'Just a dog',
    location: 'Asheville, NC',
    imagePath: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    recipient: 'some one',
    bids: [],
    fileKeys: [],
    fileUrls: [],
  };
}
