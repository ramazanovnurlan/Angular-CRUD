import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  newUserForm!: FormGroup;
  labelPosition: 'before' | 'after' = 'after';

  constructor(
    private form_builder: FormBuilder,
    public router: Router,
    private userService: UserService
  ) {
    this.newUserForm = this.form_builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  onSubmit(formValue: FormGroup) {
    if (formValue.invalid) {
      console.log('invalid');
      return;
    }
    this.userService.addUser(formValue.value).subscribe((data) => {
      console.log('submit');
      this.router.navigate(['/list']);
    });
  }
}
