import { AfterViewInit, Component, ElementRef, Inject, Injector, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ColComponent } from '../../../layout/frame/col/col.component';
import { FillComponent } from '../../../layout/frame/fill/fill.component';

export interface DialogButton{

  name:string;
  color?:string;
  evt:VoidFunction;

}

@Component({
  selector: 'app-dialog-base',
  templateUrl: './dialog-base.component.html',
  styleUrls: ['./dialog-base.component.scss']
})
export class DialogBaseComponent implements OnInit,AfterViewInit {

  @Input() width:number=500;
  @Input() fill:boolean=false;
  @Input() description:string;
  @Input() title:string='Dialog';
  @Input() btn:DialogButton[]=[];
  @ViewChild('vertAlign')vertAlignRef:ElementRef;
  @ViewChild('hortAlign')hortAlignRef:ElementRef;
  @ViewChild('containerContent')contentRef:ElementRef;

  constructor(private ref:ElementRef,private render:Renderer2) { }

  ngOnInit() {
  }

  public addButton(name:string,evt:VoidFunction):DialogBaseComponent{
    this.btn.push({
      name:name,
      evt:evt
    });
    return this;
  }

  private onButtonClick(btn:DialogButton){
    btn.evt();
  }

  ngAfterViewInit(){
    if(this.fill){
      this.render.setStyle(this.hortAlignRef.nativeElement,'height','100%');
      this.render.setStyle(this.contentRef.nativeElement,'flex-grow','1');
    }
    this.render.setStyle(this.vertAlignRef.nativeElement,'width',this.width+'px');
  }

}
