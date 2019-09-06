import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModeratorsComponent } from '../moderators/moderators.component';
import { DialogConfirmActionButtonType } from '../../../shared/dialog/dialog-action-buttons/dialog-action-buttons.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-moderator-delete',
  templateUrl: './moderator-delete.component.html',
  styleUrls: ['./moderator-delete.component.scss']
})
export class ModeratorDeleteComponent implements OnInit {

  loginId: string;


  /**
   * The confirm button type of the dialog.
   */
  confirmButtonType: DialogConfirmActionButtonType = DialogConfirmActionButtonType.Alert;


  constructor(public dialogRef: MatDialogRef<ModeratorsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private liveAnnouncer: LiveAnnouncer) { }

  ngOnInit() {
    this.announce();

  }


  public announce() {
    this.liveAnnouncer.announce('Willst du wirklich diesen Moderator löschen?', 'assertive');
  }


  close(type: string): void {
    this.dialogRef.close(type);
  }


  /**
   * Returns a lambda which closes the dialog on call.
   */
  buildCloseDialogActionCallback(): () => void {
    return () => this.close('abort');
  }


  /**
   * Returns a lambda which executes the dialog dedicated action on call.
   */
  buildModeratorDeleteActionCallback(): () => void {
    return () => this.close('delete');
  }
}
