import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersFacade } from '@state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Output() menuClick = new EventEmitter();
  appTitle = 'Heir Time';

  user$ = this.userFacade.currentUser$;

  constructor(private userFacade: UsersFacade) {}

  // TODO: temporary
  login() {
    this.userFacade.login('emanual4real@hotmail.com', 'Password123');
  }

  logout() {
    this.userFacade.logout();
  }
}
