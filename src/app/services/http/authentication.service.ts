import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UserRole } from '../../models/user-roles.enum';
import { DataStoreService } from '../util/data-store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientAuthentication } from '../../models/client-authentication';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  private readonly STORAGE_KEY: string = 'USER';
  private user = new BehaviorSubject<User>(undefined);
  private apiUrl = {
    base: 'https://arsnova-staging.mni.thm.de/api',
    v2: 'https://arsnova-staging.mni.thm.de/api/v2',
    auth: '/auth',
    login: '/login',
    user: '/user',
    register: '/register',
    registered: '/registered',
    resetPassword: '/resetpassword',
    guest: '/guest'
  };
  private httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private dataStoreService: DataStoreService,
              private http: HttpClient) {
    if (dataStoreService.has(this.STORAGE_KEY)) {
      // Load user data from local data store if available
      this.user.next(JSON.parse(dataStoreService.get(this.STORAGE_KEY)));
    }
  }

  login(email: string, password: string, userRole: UserRole): Observable<boolean> {
    const connectionUrl: string = this.apiUrl.base + this.apiUrl.auth + this.apiUrl.login + this.apiUrl.registered;

    return this.checkLogin(this.http.post<ClientAuthentication>(connectionUrl, {
      loginId: email,
      password: password
    }, this.httpOptions), userRole, false);
  }

  guestLogin(): Observable<boolean> {
    const connectionUrl: string = this.apiUrl.base + this.apiUrl.auth + this.apiUrl.login + this.apiUrl.guest;

    return this.checkLogin(this.http.post<ClientAuthentication>(connectionUrl, null, this.httpOptions), UserRole.PARTICIPANT, true);
  }

  register(email: string, password: string): Observable<boolean> {
    const connectionUrl: string = this.apiUrl.base + this.apiUrl.user + this.apiUrl.register;

    return this.http.post<boolean>(connectionUrl, {
      loginId: email,
      password: password
    }, this.httpOptions).map(() => {
      return true;
    });
  }

  resetPassword(email: string): Observable<boolean> {
    const connectionUrl: string = this.apiUrl.v2 + this.apiUrl.user + email + this.apiUrl.resetPassword;

    return this.http.post(connectionUrl, {
      key: null,
      password: null
    }, this.httpOptions).map(() => {
      return true;
    });
  }

  logout() {
    // Destroy the persisted user data
    this.dataStoreService.remove(this.STORAGE_KEY);
    this.user.next(undefined);
  }

  getUser(): User {
    return this.user.getValue();
  }

  private setUser(user: User): void {
    this.user.next(user);
    this.dataStoreService.set(this.STORAGE_KEY, JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    return this.user.getValue() !== undefined;
  }

  getRole(): UserRole {
    return this.isLoggedIn() ? this.user.getValue().role : undefined;
  }

  getToken(): string {
    return this.isLoggedIn() ? this.user.getValue().token : undefined;
  }

  private checkLogin(clientAuthentication: Observable<ClientAuthentication>, userRole: UserRole, isGuest: boolean): Observable<boolean> {
    return clientAuthentication.map(result => {
      if (result) {
        this.setUser(new User(
          result.userId,
          result.loginId,
          result.authProvider,
          result.token,
          userRole,
          isGuest));
        return true;
      } else {
        return false;
      }
    }).catch(() => {
      return of(false);
    });
  }

  get watchUser() {
    return this.user.asObservable();
  }
}