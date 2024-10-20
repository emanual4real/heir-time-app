import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, delay, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    RouterLink,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
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
