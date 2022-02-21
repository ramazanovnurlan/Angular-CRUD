import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = 'https://gorest.co.in/public/v2/';

  getAllUser(): Observable<any> {
    return this.http.get<any>(this.url + 'users');
  }

  addUser(user: any) {
    return this.http.post<any>(this.url + 'users', user);
  }

  getUser(id: any): Observable<any> {
    return this.http.get<any>(this.url + `users/${id}`);
  }

  editUser(user: any) {
    return this.http.put<any>(this.url + `users/${user.id}`, user);
  }

  deleteUser(id: any) {
    return this.http.delete<any>(this.url + `users/${id}`);
  }
}
