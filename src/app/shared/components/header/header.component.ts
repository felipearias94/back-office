import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userData$: Observable<User | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.userData$ = this.store.select(selectAuthUser);
  }

  logout(): void {
    this.authService.logout();
  }
}
