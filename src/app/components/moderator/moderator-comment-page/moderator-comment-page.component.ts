
import { Component, OnInit, Renderer2, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user';
import { NotificationService } from '../../../services/util/notification.service';
import { AuthenticationService } from '../../../services/http/authentication.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { EventService } from '../../../services/util/event.service';

@Component({
  selector: 'app-moderator-comment-page',
  templateUrl: './moderator-comment-page.component.html',
  styleUrls: ['./moderator-comment-page.component.scss']
})
export class ModeratorCommentPageComponent implements OnInit, OnDestroy, AfterContentInit {
  roomId: string;
  user: User;

  listenerFn: () => void;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notification: NotificationService,
              private authenticationService: AuthenticationService,
              public eventService: EventService,
              private _r: Renderer2,
              private liveAnnouncer: LiveAnnouncer) { }

  ngAfterContentInit(): void {
    setTimeout( () => {
      document.getElementById('live_announcer-button').focus();
    }, 500);
  }
  ngOnInit(): void {
    this.roomId = localStorage.getItem('roomId');
    this.user = this.authenticationService.getUser();
    this.announce();
    this.listenerFn = this._r.listen(document, 'keyup', (event) => {
      if (event.keyCode === 49 && this.eventService.focusOnInput === false) {
        document.getElementById('searchBox').focus();
      } else if (event.keyCode === 51 && this.eventService.focusOnInput === false) {
        document.getElementById('sort-button').focus();
      } else if (event.keyCode === 52 && this.eventService.focusOnInput === false) {
        document.getElementById('filter-button').focus();
      } else if (event.keyCode === 56 && this.eventService.focusOnInput === false) {
        this.liveAnnouncer.announce('Aktueller Sitzungs-' + document.getElementById('shortId-header').textContent);
      } else if ((event.keyCode === 57 || event.keyCode === 27) && this.eventService.focusOnInput === false) {
        this.announce();
      } else if (document.getElementById('search_close-button') && event.keyCode === 27
        && this.eventService.focusOnInput === true) {
        document.getElementById('search_close-button').click();
      } else if (event.keyCode === 27 && this.eventService.focusOnInput === true) {
        this.eventService.makeFocusOnInputFalse();
        document.getElementById('sort-button').focus();
      }
    });
  }

  ngOnDestroy() {
    this.listenerFn();
    this.eventService.makeFocusOnInputFalse();
  }

  public announce() {
    this.liveAnnouncer.clear();
    this.liveAnnouncer.announce('Du befindest dich auf der Moderations-Seite deiner Sitzung. ' +
      'Drücke die Taste 2 um auf das Sitzungs-Menü zu gelangen, ' +
      'die Taste 8 um den aktuellen Sitzungs-Code zu hören, oder die Taste 0 um zurück zur Benutzer-Seite zu gelangen. ' +
      'Sobald mehrere Fragen vorhanden sind, kannst du Fragen suchen und filtern. Mit Taste 1 gelangst du in das Suchfeld,' +
      'durch drücken der Escape-Taste wird die Sucheingabe gelöscht. Drücke die Taste 3 um Fragen zu sortieren, ' +
      'oder die Taste 4 um Fragen zu filtern, oder die Taste 9 um diese Ansage zu wiederholen.', 'assertive');
  }
}