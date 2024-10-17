import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { Item } from 'src/types/models/item';
import { ItemStatus } from '@types';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input({ required: true }) item!: Item;
}
