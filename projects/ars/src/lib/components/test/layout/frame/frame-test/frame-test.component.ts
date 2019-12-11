import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DebugBorder } from '../../../../../models/debug/DebugBorder';
import { Overlay } from '@angular/cdk/overlay';
import { DialogInstance } from '../../../../../models/util/dialog/DialogInstance';
import { DialogBuilder } from '../../../../../models/util/dialog/DialogBuilder';
import { DialogBaseComponent } from '../../../../content/dialog/dialog-base/dialog-base.component';

@Component({
  selector: 'ars-test-frame',
  templateUrl: './frame-test.component.html',
  styleUrls: ['./frame-test.component.scss']
})
export class FrameTestComponent implements OnInit,AfterViewInit {

  constructor(private overlay:Overlay) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    DebugBorder.border('c');
    DialogBuilder.init(this.overlay);
  }

  createDialog(){
    const dialog:DialogInstance<DialogBaseComponent>=DialogBuilder.createDialog();
    const instance=dialog.instance;
    dialog.createEscape();
    instance.description='test';
    instance.width=800;
    instance
      .addButton('einbutton',()=>{
        console.log('ok');
      })
      .addButton('zweibutton',()=>{
        console.log('notok');
      });
  }

}
