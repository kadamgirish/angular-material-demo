import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user/model/user';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css'],
})
export class UserFormDialogComponent implements OnInit {
  formTitle = 'Save User';
  form = this.formBuilder.group({
    id: [''],
    name: ['', { validators: [Validators.required] }],
    dateOfBirth: ['', { validators: [Validators.required] }],
    gender: ['', { validators: [Validators.required] }],
    job: ['', { validators: [Validators.required] }],
    description: ['', { validators: [Validators.required] }],
  });
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formTitle: string; data: User }
  ) {
    this.formTitle = data.formTitle;
    this.form.setValue(data.data);
  }

  ngOnInit(): void {}

  save(): void {
    console.log(this.form.valid);
    this.dialogRef.close(Object.assign(new User(), this.form.value));
  }
}
