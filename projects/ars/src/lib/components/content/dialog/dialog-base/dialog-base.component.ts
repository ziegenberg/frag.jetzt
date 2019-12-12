import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ColComponent } from '../../../layout/frame/col/col.component';
import { FillComponent } from '../../../layout/frame/fill/fill.component';
import { CdkTrapFocus } from '@angular/cdk/a11y';

export interface DialogButton{

  name:string;
  ariaLabel:string;
  title:string;
  color?:string;
  evt:VoidFunction;

}

@Component({
  selector: 'app-dialog-base',
  templateUrl: './dialog-base.component.html',
  styleUrls: ['./dialog-base.component.scss']
})
export class DialogBaseComponent implements OnInit,AfterViewInit {

  @Output() onAfterViewInit:EventEmitter<void>=new EventEmitter<void>();
  @Output() onRequestClose:EventEmitter<void>=new EventEmitter<void>();
  @Input() width:number=500;
  @Input() fill:boolean=false;
  @Input() description:string;
  @Input() title:string='Dialog';
  @Input() btn:DialogButton[]=[];
  @ViewChild('vertAlign')vertAlignRef:ElementRef;
  @ViewChild('hortAlign')hortAlignRef:ElementRef;
  @ViewChild('containerContent')contentRef:ElementRef;
  @ViewChild(CdkTrapFocus)focusTrap:CdkTrapFocus;

  constructor(private ref:ElementRef,private render:Renderer2) { }

  ngOnInit() {
  }

  public addButton(name:string,evt:VoidFunction,ariaLabel?:string,title?:string):DialogBaseComponent{
    const ariaLabelTmp=typeof ariaLabel==='undefined'?name:ariaLabel;
    const titleTmp=typeof title==='undefined'?name:title;
    this.btn.push({
      name:name,
      evt:evt,
      ariaLabel:ariaLabelTmp,
      title:titleTmp
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
    this.onAfterViewInit.emit();
  }

  private closeByOverlay(e:MouseEvent){
    if(e.target!==e.currentTarget){
      e.cancelBubble=true;
      return;
    }
    this.close();
  }

  private close(){
    this.onRequestClose.emit();
  }

  public trapFocus():DialogBaseComponent{
    this.focusTrap.focusTrap.enabled=true;
    this.focusTrap.focusTrap.focusFirstTabbableElement();
    return this;
  }

}
