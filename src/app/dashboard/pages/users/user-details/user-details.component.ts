import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

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
