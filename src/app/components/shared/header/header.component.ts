import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from '../../../services/http/authentication.service';
import { NotificationService } from '../../../services/util/notification.service';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../../../models/user';
import { UserRole } from '../../../models/user-roles.enum';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DeleteAccountComponent } from '../_dialogs/delete-account/delete-account.component';
import { UserService } from '../../../services/http/user.service';
import { EventService } from '../../../services/util/event.service';
import { AppComponent } from '../../../app.component';
import { Rescale } from '../../../models/rescale';
import { KeyboardUtils } from '../../../utils/keyboard';
import { KeyboardKey } from '../../../utils/keyboard/keys';
import { UserBonusTokenComponent } from '../../participant/_dialogs/user-bonus-token/user-bonus-token.component';
import { RemindOfTokensComponent } from '../../participant/_dialogs/remind-of-tokens/remind-of-tokens.component';
import { QrCodeDialogComponent } from '../_dialogs/qr-code-dialog/qr-code-dialog.component';
import { BonusTokenService } from '../../../services/http/bonus-token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  cTime: string;
  shortId: string;
  deviceType: string;
  isSafari = 'false';
  moderationEnabled: boolean;

  constructor(public location: Location,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              public router: Router,
              private translationService: TranslateService,
              public dialog: MatDialog,
              private userService: UserService,
              public eventService: EventService,
              private bonusTokenService: BonusTokenService,
              private _r: Renderer2
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('loggedin') !== null && localStorage.getItem('loggedin') === 'true') {
      this.authenticationService.refreshLogin();
    }
    const userAgent = navigator.userAgent;
    console.log(userAgent);
    // Check if mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      // Check if IOS device
      if (/iPhone|iPad|iPod/.test(userAgent)) {
        this.isSafari = 'true';
      }
      this.deviceType = 'mobile';
    } else {
      // Check if Mac
      if (/Macintosh|MacIntel|MacPPC|Mac68k/.test(userAgent)) {
        // Check if Safari browser
        if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
          this.isSafari = 'true';
        }
      }
      this.deviceType = 'desktop';
    }
    localStorage.setItem('isSafari', this.isSafari);
    localStorage.setItem('deviceType', this.deviceType);
    if (!localStorage.getItem('currentLang')) {
      const lang = this.translationService.getBrowserLang();
      this.translationService.setDefaultLang(lang);
      localStorage.setItem('currentLang', lang);
    } else {
      this.translationService.setDefaultLang(localStorage.getItem('currentLang'));
    }
    this.authenticationService.watchUser.subscribe(newUser => this.user = newUser);

    let time = new Date();
    this.getTime(time);
    setInterval(() => {
      time = new Date();
      this.getTime(time);
    }, 1000);

    this.router.events.subscribe(val => {
      /* the router will fire multiple events */
      /* we only want to react if it's the final active route */
      if (val instanceof NavigationEnd) {
        /* segments gets all parts of the url */
        const segments = this.router.parseUrl(this.router.url).root.children.primary.segments;
        const shortIdRegExp = new RegExp('^[0-9]{8}$');
        segments.forEach(element => {
          /* searches the url segments for a short id */
          if (shortIdRegExp.test(element.path)) {
            this.shortId = element.path;
          }
        });
      }
    });
    this.moderationEnabled = (localStorage.getItem('moderationEnabled') === 'true') ? true : false;

    this._r.listen(document, 'keyup', (event) => {
      if (
        document.getElementById('back-button') &&
        KeyboardUtils.isKeyEvent(event, KeyboardKey.Digit0) === true &&
        this.eventService.focusOnInput === false
      ) {
        document.getElementById('back-button').focus();
      } else if (KeyboardUtils.isKeyEvent(event, KeyboardKey.Digit2) === true && this.eventService.focusOnInput === false) {
        if (this.user) {
          document.getElementById('session-button').focus();
        } else {
          document.getElementById('login-button').focus();
        }
      }
    });
  }

  getTime(time: Date) {
    const hh = ('0' + time.getHours()).substr(-2);
    const mm = ('0' + time.getMinutes()).substr(-2);
    this.cTime = hh + ':' + mm;
  }

  logout() {
    // ToDo: Fix this madness.
    if (this.user.authProvider === 'ARSNOVA_GUEST') {
      this.bonusTokenService.getTokensByUserId(this.user.id).subscribe( list => {
        if (list && list.length > 0) {
          const dialogRef = this.dialog.open(RemindOfTokensComponent, {
            width: '600px'
          });
          dialogRef.afterClosed()
            .subscribe(result => {
              if (result === 'abort') {
                this.openUserBonusTokenDialog();
              } else if (result === 'logout') {
                this.logoutUser();
              }
            });
        } else {
          this.logoutUser();
        }
      });
    } else {
      this.logoutUser();
    }
  }

  logoutUser() {
    this.authenticationService.logout();
    this.translationService.get('header.logged-out').subscribe(message => {
      this.notificationService.show(message);
    });
    this.navToHome();
  }

  goBack() {
    this.location.back();
  }

  login(isLecturer: boolean) {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px'
    });
    dialogRef.componentInstance.role = (isLecturer === true) ? UserRole.CREATOR : UserRole.PARTICIPANT;
    dialogRef.componentInstance.isStandard = true;
  }

  navToHome() {
    this.router.navigate(['/']);
  }

  deleteAccount(id: string) {
    this.userService.delete(id).subscribe();
    this.authenticationService.logout();
    this.translationService.get('header.account-deleted').subscribe(msg => {
      this.notificationService.show(msg);
    });
    this.navToHome();
  }

  openDeleteUserDialog() {
    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      width: '600px'
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 'abort') {
          return;
        } else if (result === 'delete') {
          this.deleteAccount(this.user.id);
        }
      });
  }

  openUserBonusTokenDialog() {
    const dialogRef = this.dialog.open(UserBonusTokenComponent, {
      width: '600px'
    });
    dialogRef.componentInstance.userId = this.user.id;
  }

  cookiesDisabled(): boolean {
    return localStorage.getItem('cookieAccepted') === 'false';
  }

  /*Rescale*/

  /**
   * Access to static Rescale from AppComponent
   * returns Rescale from AppComponent
   */
  public getRescale(): Rescale {
    return AppComponent.rescale;
  }

  /*QR*/

  public getURL(): string {
    return `${window.location.protocol}//${window.location.hostname}/participant/room/${this.shortId}`;
  }

  public showQRDialog() {
    Rescale.requestFullscreen();
    const dialogRef = this.dialog.open(QrCodeDialogComponent, {
      panelClass: 'screenDialog'
    });
    const url = this.getURL();
    dialogRef.componentInstance.data = url;
    dialogRef.componentInstance.key = url.slice(-8);
    dialogRef.afterClosed().subscribe(res => {
      Rescale.exitFullscreen();
    });
  }
}
