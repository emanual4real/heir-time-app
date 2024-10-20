import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { DeleteItemComponent } from '../delete-item';
import { NewItemComponent } from '../new-item';
import { ItemComponent } from '../item/item.component';
import { ItemListComponent } from '../item-list';

@Component({
  selector: 'app-item-home',
  standalone: true,
  imports: [
    CommonModule,
    DeleteItemComponent,
    NewItemComponent,
    ItemComponent,
    ItemListComponent,
    MatTabsModule,
  ],
  templateUrl: './item-home.component.html',
  styleUrl: './item-home.component.scss',
})
export class ItemHomeComponent {}
