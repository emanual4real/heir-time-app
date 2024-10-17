import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemStatus } from '@types';
import { ItemComponent } from '../item/item.component';
import { Item } from 'src/types/models/item';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
