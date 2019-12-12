import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DialogInstance } from './DialogInstance';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogBaseComponent } from '../../../components/content/dialog/dialog-base/dialog-base.component';
import { ComponentRef } from '@angular/core';


export class DialogBuilder{

  private static builder:DialogBuilder;

  public static init(overlay:Overlay){
    if(this.builder){
      console.error('DialogBuilder already initialized. You can use DialogBuilder.createDialog()');
      return;
    }
    this.builder=new DialogBuilder(overlay);
  }

  public static createDialog():DialogInstance<DialogBaseComponent>{
    const dialog:OverlayRef=this.builder.overlay.create();
    const portal:ComponentPortal<DialogBaseComponent>=new ComponentPortal<DialogBaseComponent>(DialogBaseComponent,null,);
    const component:ComponentRef<DialogBaseComponent>=dialog.attach(portal);
    const instance:DialogBaseComponent=component.instance;
    const dialogInstance=new DialogInstance<DialogBaseComponent>(dialog,portal,component,instance);
    instance.onRequestClose.subscribe(()=>{
      dialogInstance.close();
    });
    dialogInstance.setLastFocus();
    dialogInstance.createEscape();
    return dialogInstance;
  }

  private constructor(public overlay:Overlay) {}


}
