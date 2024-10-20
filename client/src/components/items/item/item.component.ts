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
import { Item, ItemFormGroup } from 'src/types/models/item';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { itemStatusSelectOptions } from '@utils';

@Component({
  selector: 'app-item',
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
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  @Input({ required: true }) item!: Item;
  @Input({ required: false }) readOnly = true;

  itemForm: FormGroup<ItemFormGroup> = this.fb.group<ItemFormGroup>({
    title: this.fb.control(null),
    releaseDate: this.fb.control(null),
    itemStatus: this.fb.control(null),
    description: this.fb.control(null),
    location: this.fb.control(null),
    recipient: this.fb.control(null),
  });

  itemStatusOptions = itemStatusSelectOptions;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.itemForm.patchValue({
      title: this.item.title,
      releaseDate: new Date(this.item.releaseDate),
      itemStatus: this.item.itemStatus,
      description: this.item.description,
      location: this.item.location,
      recipient: this.item.recipient,
    });
  }
}
