import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  userData: any = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'gender',
    'status',
    'op',
    'actions',
  ];
  dataSource!: MatTableDataSource<User>;
  totalSize: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  goto_edit(id: number) {
    this.router.navigate(['/edit/' + id]);
  }

  delete(id: number) {
    this.user
      .deleteUser(id)
      .subscribe((data) => {
        alert("silindi");
        this.getAllUser();
      });
  }
  getAllUser(){
    this.user.getAllUser().subscribe((data) => {
      console.log(data);
      this.userData = data;
      this.dataSource = new MatTableDataSource<User>(this.userData);
      this.dataSource.paginator = this.paginator;
    });
  }
}
