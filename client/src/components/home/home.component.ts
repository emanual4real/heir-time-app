import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MenuComponent } from '../menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ItemComponent,
    MenuComponent,
    NavbarComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sideMenuToggle = false;

  handleMenuClick() {
    this.sideMenuToggle = !this.sideMenuToggle;
  }
}
