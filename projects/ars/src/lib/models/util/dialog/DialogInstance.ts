import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';


export class DialogInstance<E>{

  private escapeFunction;
  private lastFocus;

  constructor(
    public overlayRef:OverlayRef,
    public componentPortal:ComponentPortal<E>,
    public componentRef:ComponentRef<E>,
    public instance:E
  ){}

  public close(){
    this.overlayRef.detach();
    this.restoreLastFocus();
  }

  private restoreLastFocus(){
    if(typeof this.lastFocus!=='undefined'){
      this.lastFocus.focus();
    }
  }

  public createEscape():DialogInstance<E>{
    console.log('createEscape');
    window.addEventListener('keydown',this.escapeFunction=e=>{
      if(e.key==='Escape'){
        this.close();
        window.removeEventListener('keydown',this.escapeFunction);
      }
    });
    return this;
  }

  public setLastFocus(lastFocus?:Element):DialogInstance<E>{
    if(typeof lastFocus==='undefined'){
      return this.setLastFocus(document.activeElement);
    }
    this.lastFocus=lastFocus;
    return this;
  }

  public getLastFocus():Element{
    return this.lastFocus;
  }

}
