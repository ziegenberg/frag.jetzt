import { Component, OnInit } from '@angular/core';
import { RoomCreateComponent } from '../../shared/_dialogs/room-create/room-create.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/util/language.service';
import { LoginPageComponent } from '../login-page/login-page.component';
import { AuthenticationService } from '../../../services/http/authentication.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-new-landing',
  templateUrl: './new-landing.component.html',
  styleUrls: ['./new-landing.component.scss']
})
export class NewLandingComponent implements OnInit {

  user: User;

  constructor(private router: Router,
              public dialog: MatDialog,
              private translateService: TranslateService,
              protected langService: LanguageService,
              public authenticationService: AuthenticationService) {
    langService.langEmitter.subscribe(lang => translateService.use(lang));
  }

  ngOnInit() {
    this.translateService.use(localStorage.getItem('currentLang'));
    this.authenticationService.watchUser.subscribe(newUser => this.user = newUser);
  }

  createSession() {
    if (this.user) {
      this.openCreateRoomDialog();
    } else {
      this.openLoginDialog();
    }
  }

  openCreateRoomDialog(): void {
    this.dialog.open(RoomCreateComponent, {
      width: '350px'
    });
  }

  openLoginDialog(): void {
    this.dialog.open(LoginPageComponent, {
      width: '350px'
    });
  }
}
