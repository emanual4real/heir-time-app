import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/services/user';
import { User } from '@types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
// implements OnInit
export class HomeComponent {
  user!: User;

  constructor(private userService: UserService) {}

  data$ = this.userService.user;

  login() {
    this.userService.login('emanual4real@hotmail.com', 'Password123');
  }

  logout() {
    this.userService.logout();
  }

  // ngOnInit(): void {
  //   this.userService.login('emanual4real@hotmail.com', 'Password123');
  // }
}
