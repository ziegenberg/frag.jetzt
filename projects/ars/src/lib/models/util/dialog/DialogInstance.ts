import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';


export class DialogInstance<E>{

  private escapeFunction;

  constructor(
    public overlayRef:OverlayRef,
    public componentPortal:ComponentPortal<E>,
    public componentRef:ComponentRef<E>,
    public instance:E
  ){}

  public createEscape():DialogInstance<E>{
    console.log('createEscape');
    window.addEventListener('keydown',this.escapeFunction=e=>{
      if(e.key==='Escape'){
        this.overlayRef.detach();
      }
    });
    return this;
  }

}
