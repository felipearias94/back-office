import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  userId: number;
  selectedUser: User | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.userId = Number(this.activatedRoute.snapshot.params['id']);
    this.loadUserById();
  }

  loadUserById(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.selectedUser = user;
      },
    });
  }
}
