import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material';

@Component({
  selector: 'app-io-slider',
  templateUrl: './io-slider.component.html',
  styleUrls: ['./io-slider.component.scss']
})
export class IoSliderComponent implements OnInit,AfterViewInit {

  public static style:Object={
    'mat-slider-wrapper':'rgba(127,127,127,0.8)',
    'mat-slider-track-wrapper':'',
    'mat-slider-track-fill':'var(--on-surface)',
    'mat-slider-track-background':'',
    'mat-slider-ticks-container':'',
    'mat-slider-ticks':'',
    'mat-slider-thumb-container':'',
    'mat-slider-focus-ring':'',
    'mat-slider-thumb':'var(--on-surface)',
    'mat-slider-thumb-label':'',
    'mat-slider-thumb-label-text':'',
  };

  @Output() adjust:EventEmitter<number>=new EventEmitter<number>();
  @Output() change:EventEmitter<number>=new EventEmitter<number>();
  @Input() min:number=0;
  @Input() max:number=100;
  @Input() value:number=0;
  @Input() step:number=1;
  @ViewChild('slider')sliderRef:MatSlider;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    Array.from((<HTMLElement>this.sliderRef._elementRef.nativeElement).getElementsByTagName('*')).forEach(e=>{
      if(IoSliderComponent.style.hasOwnProperty(e.className)){
        if(IoSliderComponent.style[e.className]!==''){
          (<HTMLElement>e).style.backgroundColor=IoSliderComponent.style[e.className];
        }
      }
    });
  }

}
