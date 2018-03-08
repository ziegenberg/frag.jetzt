import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UserRole } from './user-roles.enum';
import { DataStoreService } from './data-store.service';

// TODO: connect to API
// TODO: persist user data (shouldn't get lost on page refresh)
@Injectable()
export class AuthenticationService {
  private readonly STORAGE_KEY: string = 'USER';
  private user: User;

  constructor(private dataStoreService: DataStoreService) {
    if (dataStoreService.has(this.STORAGE_KEY)) {
      // Load user data from local data store if available
      this.user = JSON.parse(dataStoreService.get(this.STORAGE_KEY));
    }
  }

  login(email: string, password: string, role: UserRole): Observable<boolean> {
    this.user = new User(1, '', email, role, 'TOKEN');
    // Store user data in local storage to retain the data when the user reloads the page
    this.dataStoreService.set(this.STORAGE_KEY, JSON.stringify(this.user));

    return of(true);
  }

  register(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  resetPassword(email: string): Observable<boolean> {
    return of(true);
  }

  logout() {
    // Destroy the persisted user data
    this.dataStoreService.remove(this.STORAGE_KEY);
    this.user = undefined;
  }

  getUser(): Observable<User> {
    return of(this.user);
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.user !== undefined);
  }

  getRole(): Observable<UserRole> {
    return of(this.user.role);
  }

}
