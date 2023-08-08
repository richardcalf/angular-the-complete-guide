import { Component, Input } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  constructor(private usersService: UsersService) {}
  
  @Input() users: string[];

  onSetToActive(id: number) {
    this.usersService.setUserActive(id);
  }
}
