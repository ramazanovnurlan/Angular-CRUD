import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  id: any;
  currentUser: any;
  editUserForm!: FormGroup;
  constructor(
    private user: UserService,
    private activatedRoute: ActivatedRoute,
    private form_builder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params.id;
    this.getData(this.id);
  }

  ngOnInit(): void {}

  getData(id: any) {
    this.user.getUser(id).subscribe((data) => {
      if (data.errorCode && data.errorCode == 1) {
      } else {
        this.currentUser = data;
        this.editUserForm = this.form_builder.group({
          id: [data.id, Validators.required],
          name: [data.name, Validators.required],
          email: [data.email, Validators.required],
          status: [data.status, Validators.required],
          gender: [data.gender, Validators.required],
        });
      }
    });
  }

  onSubmit(formValue: FormGroup) {
    if (formValue.invalid) {
      console.log('invalid');
      return;
    }
    this.userService.editUser(formValue.value).subscribe((data) => {
      console.log('submit');
      this.router.navigate(['/list']);
    });
  }
}
