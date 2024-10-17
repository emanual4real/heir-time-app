import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from 'src/services/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  appTitle = 'Heir Time';

  user$ = this.userService.user;

  constructor(private userService: UserService) {}

  // TODO: temporary
  login() {
    this.userService.login('emanual4real@hotmail.com', 'Password123');
  }

  logout() {
    this.userService.logout();
  }
}
