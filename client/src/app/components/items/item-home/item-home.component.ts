import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DeleteItemComponent } from '../delete-item';
import { ItemListComponent } from '../item-list';
import { ItemComponent } from '../item/item.component';
import { NewItemComponent } from '../new-item';

@Component({
  selector: 'app-item-home',
  standalone: true,
  imports: [CommonModule, DeleteItemComponent, NewItemComponent, ItemComponent, ItemListComponent],
  templateUrl: './item-home.component.html',
  styleUrl: './item-home.component.css',
})
export class ItemHomeComponent {}
