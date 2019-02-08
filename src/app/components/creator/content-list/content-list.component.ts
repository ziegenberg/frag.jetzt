import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/http/content.service';
import { Content } from '../../../models/content';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContentChoice } from '../../../models/content-choice';
import { ContentText } from '../../../models/content-text';
import { ContentType } from '../../../models/content-type.enum';
import { ContentGroup } from '../../../models/content-group';
import { MatDialog } from '@angular/material';
import { NotificationService } from '../../../services/util/notification.service';
import { Room } from '../../../models/room';
import { RoomService } from '../../../services/http/room.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/util/language.service';
import { ContentDeleteComponent } from '../_dialogs/content-delete/content-delete.component';
import { ContentCreatorComponent } from '../content-creator/content-creator.component';


@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})


export class ContentListComponent implements OnInit {

  contents: Content[];

  contentBackup: Content;

  roomId: string;

  contentGroup: ContentGroup;

  room: Room;

  isLoading = true;

  collectionName: string;

  constructor(private contentService: ContentService,
              private roomService: RoomService,
              private route: ActivatedRoute,
              private location: Location,
              private notificationService: NotificationService,
              public dialog: MatDialog,
              private translateService: TranslateService,
              protected langService: LanguageService) {
    langService.langEmitter.subscribe(lang => translateService.use(lang));
  }

  ngOnInit() {
    this.roomId = localStorage.getItem(`roomId`);
    this.roomService.getRoom(this.roomId).subscribe(room => {
      this.room = room;
      this.roomId = room.shortId;
    });
    this.contentGroup = JSON.parse(sessionStorage.getItem('contentGroup'));
    this.contentService.getContentsByIds(this.contentGroup.contentIds).subscribe( contents => {
      this.contents = contents;
    });
    this.route.params.subscribe(params => {
      sessionStorage.setItem('collection', params['contentGroup']);
      this.collectionName = params['contentGroup'];
    });
    this.translateService.use(localStorage.getItem('currentLang'));
    this.isLoading = false;
  }

  findIndexOfSubject(subject: string): number {
    let index = -1;
    for (let i = 0; i < this.contents.length; i++) {
      if (this.contents[i].subject.valueOf() === subject.valueOf()) {
        index = i;
        break;
      }
    }
    return index;
  }

  createChoiceContentBackup(content: ContentChoice) {
    this.contentBackup = new ContentChoice(
      content.id,
      content.revision,
      content.roomId,
      content.subject,
      content.body,
      content.round,
      content.groups,
      content.options,
      content.correctOptionIndexes,
      content.multiple,
      content.format
    );
  }

  createTextContentBackup(content: ContentText) {
    this.contentBackup = new ContentText(
      content.id,
      content.revision,
      content.roomId,
      content.subject,
      content.body,
      content.round,
      [],
    );
  }

  deleteContent(delContent: Content) {
    const index = this.findIndexOfSubject(delContent.subject);
    this.contentBackup = delContent;
    const dialogRef = this.dialog.open(ContentDeleteComponent, {
      width: '800px'
    });
    dialogRef.componentInstance.content = delContent;
    dialogRef.afterClosed()
      .subscribe(result => {
        this.updateContentChanges(index, result);
      });
  }

  editContent(edContent: Content) {
    if (edContent.format === ContentType.TEXT) {
      this.createTextContentBackup(edContent as ContentText);
    } else {
      this.createChoiceContentBackup(edContent as ContentChoice);
    }

    const index = this.findIndexOfSubject(edContent.subject);
    const dialogRef = this.dialog.open(ContentCreatorComponent, {
      width: '800px'
    });
    dialogRef.componentInstance.editDialogMode = true;
    dialogRef.componentInstance.content = edContent;
    dialogRef.afterClosed()
      .subscribe(result => {
        this.updateContentChanges(index, result);
      });
  }

  updateContentChanges(index: number, action: string) {
    if (!action) {
      this.contents[index] = this.contentBackup;
    } else {
      if (action.valueOf() === 'delete') {
        this.notificationService.show('Content "' + this.contents[index].subject + '" deleted.');
        this.contentService.deleteContent(this.contents[index].id).subscribe();
        this.contents.splice(index, 1);
        if (this.contents.length === 0) {
          this.location.back();
        }
      }
      if (action.valueOf() === 'edit') {
        this.notificationService.show('Content "' + this.contents[index].subject + '" updated.');
        this.contentService.updateContent(this.contents[index]);
      }
      if (action.valueOf() === 'abort') {
        this.contents[index] = this.contentBackup;
      }
    }
  }
}
