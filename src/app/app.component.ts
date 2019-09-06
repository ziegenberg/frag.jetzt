import { AfterViewInit, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate } from '@angular/service-worker';
import { NotificationService } from './services/util/notification.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { RescaleComponent } from './components/prototype/rescale/rescale.component';
import { ResponsiveWrpComponent } from './components/prototype/responsive-wrp/responsive-wrp.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


  public static rescale: RescaleComponent;
  public static responsive: ResponsiveWrpComponent;

  @ViewChild(RescaleComponent) rescale: RescaleComponent;
  @ViewChild(ResponsiveWrpComponent) responsive: ResponsiveWrpComponent;

  icons = [
    'beamer',
    'meeting_room'
  ];

  constructor(private translationService: TranslateService,
              private update: SwUpdate,
              public notification: NotificationService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    translationService.setDefaultLang(this.translationService.getBrowserLang());
    sessionStorage.setItem('currentLang', this.translationService.getBrowserLang());
    for (const icon of this.icons) {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/' + icon + '.svg')
      );
    }
  }

  title = 'frag.jetzt';

  ngOnInit(): void {
    this.update.available.subscribe(update => {
      let install: string;
      this.translationService.get('home-page.install').subscribe(msg => {
        install = msg;
      });
      this.translationService.get('home-page.update-available').subscribe(msg => {
       this.notification.show(msg, install, {
          duration: 10000
        });
      });
      this.notification.snackRef.afterDismissed().subscribe(info => {
        if (info.dismissedByAction === true) {
          window.location.reload();
        }
      });
    });
  }

  ngAfterViewInit() {
    AppComponent.rescale = this.rescale;
    AppComponent.responsive = this.responsive;
    /* Quick Solution, needs improvement */
    /* The Listener is used for internal rescale */
    /* window.resize, won't get triggered. The Listener updates all Responsive Components. Needs some rework. */
    AppComponent.rescale.addListener(AppComponent.responsive);
  }
}








