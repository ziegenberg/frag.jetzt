import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-responsive-wrp',
  templateUrl: './responsive-wrp.component.html',
  styleUrls: ['./responsive-wrp.component.scss']
})
export class ResponsiveWrpComponent implements OnInit, AfterViewInit {

  public static createStyle = (width, mobPad) => {
    return {
      'mobile': {
        'width': 'calc( 100% - ' + (mobPad * 2) + 'px )',
        'margin-left': mobPad + 'px'
      },
      'desktop': {
        'width': width + 'px',
        'margin-left': 'calc( 50% - ' + (width / 2) + 'px )'
      }
    };
  }

  @Input() width: number;
  @Input() mobPad: number;

  // tslint:disable-next-line:member-ordering
  private wrp: HTMLElement;
  // tslint:disable-next-line:member-ordering
  private resp: HTMLElement;
  // tslint:disable-next-line:member-ordering
  private style: Object;
  // tslint:disable-next-line:member-ordering
  private isMobile: boolean;

  constructor(private ref: ElementRef, private render: Renderer2) { }

  ngOnInit() {
    if (!this.mobPad) {this.mobPad = 0; }
    this.style = ResponsiveWrpComponent.createStyle(this.width, this.mobPad);
  }

  ngAfterViewInit() {
    this.wrp = this.ref.nativeElement;
    this.resp = this.ref.nativeElement.children[0];
    window.addEventListener('resize', e => {
      this.update(false);
    });
    this.update(true);
  }

  update(force: boolean) {
    this.checkDimension(this.getWidth(), force);
  }

  checkDimension(width: number, force: boolean) {
    this.checkState(width <= this.width, force);
  }

  checkState(isMobile: boolean, force: boolean) {
    if (!force && this.isMobile == isMobile) {return; }
    this.isMobile = isMobile;
    this.setStyle(this.style[this.isMobile ? 'mobile' : 'desktop']);
  }

  setStyle(style: Object) {
    for (const k in style) {
      this.render.setStyle(this.resp, k, style[k]);
    }
  }

  getWidth(): number {
    return this.ref.nativeElement.offsetWidth;
  }



}
