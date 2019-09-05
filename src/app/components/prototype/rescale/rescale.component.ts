import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-rescale',
  templateUrl: './rescale.component.html',
  styleUrls: ['./rescale.component.scss']
})
export class RescaleComponent implements OnInit, AfterViewInit {

  private scale = 100;
  private screen: HTMLElement;
  private rescaler: HTMLElement;

  constructor(private ref: ElementRef, private render: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.screen = this.ref.nativeElement.children[0];
    this.rescaler = <HTMLElement>this.screen.children[0];
    window.addEventListener('resize', e => {
      this.update();
    });
    this.update();
  }

  update() {
    this.setDimRe(this.getWidth(), this.getHeight());
  }

  setDimRe(width: number, height: number) {
    const w = width / (100 / this.scale);
    const h = height / (100 / this.scale);
    this.setStyleRe('width', w + 'px');
    this.setStyleRe('height', h + 'px');
    this.setStyleRe('left', ((width / 2) - (w / 2)) + 'px');
    this.setStyleRe('top', ((height / 2) - (h / 2)) + 'px');
    this.setStyleRe('transform', 'scale(' + (100 / this.scale) + ')');
  }

  setStyleRe(style: string, value: any) {
    this.render.setStyle(this.rescaler, style, value);
  }

  getWidth(): number {
    return this.screen.offsetWidth;
  }

  getHeight(): number {
    return this.screen.offsetHeight;
  }

  scaleUp(val: number) {
    this.setScale(this.scale + val);
  }

  scaleDown(val: number) {
    this.setScale(this.scale - val);
  }

  setScale(scale: number) {
    this.scale = scale;
    if (this.scale < 10) {this.scale = 10; } else if (this.scale > 500) {this.scale = 500; }
    this.update();
  }

  getScale(): number {
    return this.scale;
  }

}
