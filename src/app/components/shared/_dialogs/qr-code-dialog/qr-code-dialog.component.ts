import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogConfirmActionButtonType } from '../../dialog/dialog-action-buttons/dialog-action-buttons.component';
import { NgxQRCodeComponent } from 'ngx-qrcode2';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(NgxQRCodeComponent) code: NgxQRCodeComponent;
  @ViewChildren(HTMLImageElement) images: QueryList<HTMLImageElement>;

  private img: HTMLImageElement;
  private qrCode = '';

  confirmButtonType: DialogConfirmActionButtonType = DialogConfirmActionButtonType.Primary;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<QrCodeDialogComponent>, private ref: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public setQRCode(url: string) {
    this.qrCode = url;
    this.code.value = url;
    this.code.createQRCode();
  }

}
