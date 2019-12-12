import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ars-btn]',
  host:{
    'aria-label':'button',
    'role':'button'
  }
})
export class BtnDirective implements AfterViewInit{

  @Input() ariaLabel:string;

  constructor(private ref:ElementRef,private render:Renderer2){}

  ngAfterViewInit(){
    if(!this.ariaLabel)console.warn('BtnDirective: aria-label Input undefined');
    this.render.setAttribute(this.ref.nativeElement,'aria-label',this.ariaLabel);
  }

}
