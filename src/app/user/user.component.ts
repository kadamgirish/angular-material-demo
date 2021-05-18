import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { User } from './model/user';
import { UserService } from './user.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = [
    'id',
    'name',
    'dateOfBirth',
    'gender',
    'job',
    'description',
    'actions',
  ];
  public dataSource: MatTableDataSource<User>;
  private serviceSubscribe: Subscription;

  constructor(private usersService: UserService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>();
  }

  edit(data: User) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      height: '550px',
      width: '600px',
      data: { formTitle: 'Edit User', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.edit(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.remove(id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.usersService.getAll();
    this.serviceSubscribe = this.usersService.users$.subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}
