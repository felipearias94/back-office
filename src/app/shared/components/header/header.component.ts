import { Component } from '@angular/core';
import { Role, User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import {
  selectAuthUser,
  selectAuthUserRole,
  selectIsAdmin,
} from 'src/app/store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userData$: Observable<User | null>;
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store) {
    this.userData$ = this.store.select(selectAuthUser);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  logout(): void {
    this.authService.logout();
  }
}
