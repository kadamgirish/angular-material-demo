import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { User } from '../user/model/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private usersService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      height: '550px',
      width: '600px',
      data: {formTitle: 'Add User', data: new User()}});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.add(result);
      }
      console.log(result)
    });
  }
}
