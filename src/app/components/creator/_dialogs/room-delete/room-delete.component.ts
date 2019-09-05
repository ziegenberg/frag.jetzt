import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Room } from '../../../../models/room';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { DialogConfirmActionButtonType } from '../../../shared/dialog/dialog-action-buttons/dialog-action-buttons.component';

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.scss']
})
export class RoomDeleteComponent implements OnInit {
  room: Room;


  /**
   * The confirm button type of the dialog.
   */
  confirmButtonType: DialogConfirmActionButtonType = DialogConfirmActionButtonType.Alert;


  constructor(public dialogRef: MatDialogRef<RoomEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }


  /**
   * Closes the dialog on call.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }


  /**
   * Returns a lambda which closes the dialog on call.
   */
  buildCloseDialogActionCallback(): () => void {
    return () => this.closeDialog();
  }


  /**
   * Returns a lambda which executes the dialog dedicated action on call.
   */
  buildRoomDeleteActionCallback(): () => void {
    return () => this.dialogRef.close('delete');
  }
}
