import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, delay, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, MatSidenavModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  @Input({ required: true }) opened = false;
  @Output() menuClick = new EventEmitter();

  closeMenu = new BehaviorSubject(0);
  menuCloseDelay = 2000;

  closeSideNav() {
    this.closeMenu.next(this.menuCloseDelay);
  }

  ngOnInit(): void {
    this.closeMenu
      .pipe(
        switchMap((value) => {
          if (value > 0) {
            return of(true).pipe(delay(value));
          } else {
            return of(false);
          }
        })
      )
      .subscribe((value) => {
        if (value) {
          this.menuClick.emit();
        }
      });
  }
}
