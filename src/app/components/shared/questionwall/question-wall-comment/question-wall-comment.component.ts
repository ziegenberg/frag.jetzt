import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { QuestionWallComment } from '../QuestionWallComment';
import { QuestionWallComponent } from '../question-wall/question-wall.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-wall-comment',
  templateUrl: './question-wall-comment.component.html',
  styleUrls: ['./question-wall-comment.component.scss']
})
export class QuestionWallCommentComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() comment: QuestionWallComment;
  @Output() action: EventEmitter<(q: QuestionWallComponent) => void> = new EventEmitter<(q: QuestionWallComponent) => void>();

  inputSup: Subscription;

  constructor(public ref: ElementRef) {
  }

  ngOnInit(): void {
    this.inputSup = this.comment.action.subscribe(() => {
      this.focusComment();
    });
  }

  ngAfterViewInit(): void {
    this.comment.onInit.emit();
  }

  ngOnDestroy() {
    this.inputSup.unsubscribe();
    this.action.complete();
  }

  focusComment() {
    this.action.emit(q => {
      q.focusCommentComponent(this);
    });
  }

  filterUser() {
    this.action.emit(q => {
      q.filterUser(this.comment);
    });
  }

  like() {
    this.action.emit(q => q.likeComment(this.comment));
  }

  dislike() {
    this.action.emit(q => q.dislikeComment(this.comment));
  }

}
