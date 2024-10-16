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
export class HomeComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .login('emanual4real@hotmail.com', 'Password123')
      .subscribe((data) => {
        this.user = data;
      });
  }
}
