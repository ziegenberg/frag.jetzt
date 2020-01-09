import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DiaOverlayComponent } from './dialog/dia-overlay/dia-overlay.component';
import { EventService } from '../../../../../../src/app/services/util/event.service';
import { Observable } from 'rxjs';
import { ComponentRef } from '@angular/core';
import { DialogInstance } from '../../models/dialog/DialogInstance';
import { Consumer, Dia } from './Dia';
import { DiaBase } from './dialog/DiaBase';

export interface Fun<C,R>{
  (e:Consumer<C>):R;
}

// export interface DiaInstance<E>{
//
//   overlayRef:OverlayRef;
//   portal:ComponentPortal<E>;
//   componentRef:ComponentRef<E>;
//   instance:E;
//   detach():void;
//   make(e:Consumer<E>):DiaInstance<E>;
//
// }

export class DiaInstance<E>{

  public instance:E;

  constructor(
    public overlayRef:OverlayRef,
    public portal:ComponentPortal<E>,
    public componentRef:ComponentRef<E>
  ){
    this.instance=componentRef.instance;
  }

  public detach(){
    this.overlayRef.detach();
  }

}

export class DiaBuilder{

  private static dialogBuilder:DiaBuilder;
  private static eventService:EventService;

  public static init(eventService:EventService, overlay:Overlay){
    if(this.dialogBuilder!=null)console.error("alreadyInitialized");
    DiaBase.eventService=eventService;
    this.eventService=eventService;
    this.dialogBuilder=new DiaBuilder(overlay);
  }

  public static createDialogBackground(key:any):DiaInstance<DiaOverlayComponent>{
    const dialog=this.createDialogInstance(DiaOverlayComponent);
    dialog.instance.key=key;
    return dialog;
  }

  public static createDialog<T>(key:any,comp:ComponentType<T>):Dia<T>{
    const background=this.createDialogBackground(key);
    return new Dia<T>(
      this.eventService.on(key),
      this.createDialogInstance(comp),
      background
    );
  }

  public static createDialogInstance<T>(componentType:ComponentType<T>):DiaInstance<T>{
    const overlayRef=this.dialogBuilder.create();
    const portal=new ComponentPortal(componentType);
    const componentRef=overlayRef.attach(portal);
    return new DiaInstance(overlayRef,portal,componentRef);
  }

  private constructor(private overlay:Overlay){}

  public create():OverlayRef{
    return this.overlay.create();
  }

}
