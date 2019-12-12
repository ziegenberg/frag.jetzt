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
    instance.title='Use Google\'s location service?';
    instance.description='Material Design UIs are displayed in an environment that expresses three-dimensional (3D) space using light, surfaces, and cast shadows. All elements in the Material environment move horizontally, vertically, and at varying depths along the z-axis. Depth is depicted by placing elements at various points along the positive z-axis extending towards the viewer.';
    instance.width=500;
    instance
      .addButton('disagree',()=>{
        console.log('ok');
      })
      .addButton('agree',()=>{
        console.log('notok');
      });
    instance.onAfterViewInit.subscribe(()=>{
      dialog.setLastFocus(document.activeElement);
      instance.trapFocus();
    });
  }

}
