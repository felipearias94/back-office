import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userData;
  constructor(private router: Router, private authService: AuthService) {
    this.userData = this.authService._authUser$;
  }

  logout(): void {
    this.router.navigate(['auth']);
  }
}
