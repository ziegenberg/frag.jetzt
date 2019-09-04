import { LanguageService } from './../../../services/util/language.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/util/notification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../services/http/authentication.service';
import { User } from '../../../models/user';
import { Room } from '../../../models/room';
import { DemoVideoComponent } from '../../home/_dialogs/demo-video/demo-video.component';
import { ThemeService } from '../../../../theme/theme.service';
import {ThemeObj} from '../../../../theme/ThemeObj';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  blogUrl = 'https://arsnova.thm.de/blog/';
  dsgvoUrl = 'https://arsnova.thm.de/blog/datenschutzerklaerung/';
  imprUrl = 'https://arsnova.thm.de/blog/impressum/';
  demoId = '78844652';

  room: Room;
  user: User;

  open: string;
  deviceType: string;

  themeClass = localStorage.getItem('theme');

  /*THEMES*/

  private themes:ThemeObj[];

  /**/

  constructor(public notificationService: NotificationService,
              public router: Router,
              public dialog: MatDialog,
              private translateService: TranslateService,
              private langService: LanguageService,
              public authenticationService: AuthenticationService,
              private themeService: ThemeService) {
    langService.langEmitter.subscribe(lang => translateService.use(lang));
  }

  ngOnInit() {
    this.deviceType = localStorage.getItem('deviceType');
    this.translateService.use(localStorage.getItem('currentLang'));
    this.translateService.get('footer.open').subscribe(message => {
      this.open = message;
    });
    /*Init Themes*/
    this.themes=this.themeService.getThemes();
    console.log(this.themes);
  }

  navToBlog() {
    this.translateService.get('footer.will-open').subscribe(message => {
      this.notificationService.show('Blog' + message, this.open, {
        duration: 4000
      });
    });
    this.notificationService.snackRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        window.open(this.blogUrl, '_blank');
      }
    });
  }

  navToDSGVO() {
    this.translateService.get('footer.will-open').subscribe(message => {
      this.translateService.get('footer.dsgvo').subscribe(what => {
        this.notificationService.show(what + message, this.open, {
          duration: 4000
        });
      });
    });
    this.notificationService.snackRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        window.open(this.dsgvoUrl, '_blank');
      }
    });
  }

  navToImprint() {
    this.translateService.get('footer.will-open').subscribe(message => {
      this.translateService.get('footer.imprint').subscribe(what => {
        this.notificationService.show(what + message, this.open, {
          duration: 4000
        });
      });
    });
    this.notificationService.snackRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        window.open(this.imprUrl, '_blank');
      }
    });
  }

  showDemo() {
    const dialogRef = this.dialog.open(DemoVideoComponent, {
      position: {
        left: '10px',
        right: '10px'
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
    dialogRef.componentInstance.deviceType = this.deviceType;
  }

  useLanguage(language: string) {
    this.translateService.use(language);
    localStorage.setItem('currentLang', language);
    this.langService.langEmitter.emit(language);
  }

  changeTheme(theme:ThemeObj) {
    this.themeClass = theme.name;
    this.themeService.activate(theme.name);
  }
}
