import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemFormGroup } from 'src/types/models/item';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { itemStatusSelectOptions } from '@utils';
import { ItemService } from '@services';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
})
export class NewItemComponent {
  itemForm: FormGroup<ItemFormGroup> = this.fb.group<ItemFormGroup>({
    title: this.fb.control(null),
    releaseDate: this.fb.control(null),
    itemStatus: this.fb.control(null),
    description: this.fb.control(null),
    location: this.fb.control(null),
    recipient: this.fb.control(null),
  });

  itemStatusOptions = itemStatusSelectOptions;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
  ) {}

  createItem() {
    this.itemService;
  }
}
