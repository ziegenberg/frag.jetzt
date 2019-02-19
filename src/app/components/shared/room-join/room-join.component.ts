import { Component, OnInit } from '@angular/core';
import { Room } from '../../../models/room';
import { RoomService } from '../../../services/http/room.service';
import { Router } from '@angular/router';
import { RegisterErrorStateMatcher } from '../../home/_dialogs/register/register.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { NotificationService } from '../../../services/util/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../services/http/authentication.service';
import { UserRole } from '../../../models/user-roles.enum';
import { User } from '../../../models/user';
import {log} from "util";

export class JoinErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-room-join',
  templateUrl: './room-join.component.html',
  styleUrls: ['./room-join.component.scss']
})
export class RoomJoinComponent implements OnInit {

  room: Room;
  demoId = '95680586';
  user: User;
  loggedIn: string;

  roomFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  matcher = new RegisterErrorStateMatcher();

  constructor(private roomService: RoomService,
              private router: Router,
              public notificationService: NotificationService,
              private translateService: TranslateService,
              public authenticationService: AuthenticationService, ) {
  }

  ngOnInit() {
  }

  getRoom(id: string): void {
    this.roomService.getRoomByShortId(id)
      .subscribe(room => {
        this.room = room;
        if (!room) {
          this.translateService.get('home-page.no-room-found').subscribe(message => {
            this.notificationService.show(message);
          });
        } else {
          if (!this.user) {
            this.authenticationService.guestLogin(UserRole.PARTICIPANT).subscribe(loggedIn => {
              this.loggedIn = loggedIn;
            });
          }
          if (this.loggedIn = 'true') {
            this.roomService.addToHistory(this.room.id);
            this.router.navigate([`/participant/room/${id}`]);
          }
        }
      });
  }

  joinRoom(id: string): void {
    if (!this.roomFormControl.hasError('required') && !this.roomFormControl.hasError('minlength')) {
      this.getRoom(id);
    }
  }

  joinDemo(): void {
    this.getRoom(this.demoId);
  }
}
