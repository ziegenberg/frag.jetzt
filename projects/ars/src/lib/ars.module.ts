import { NgModule } from '@angular/core';
import { ArsComponent } from './ars.component';
import { ArsSliderDirective } from './components/io/slider/ars-slider.directive';
import { ArsSliderCombComponent } from './components/io/slider/ars-slider-comb/ars-slider-comb.component';
import { MatButtonModule, MatIconModule, MatRippleModule } from '@angular/material';
import { FullScreenOverlayComponent } from './components/layout/base/full-screen-overlay/full-screen-overlay.component';
import { RowComponent } from './components/layout/frame/row/row.component';
import { ColComponent } from './components/layout/frame/col/col.component';
import { FillComponent } from './components/layout/frame/fill/fill.component';
import { WrapperDirective } from './components/layout/frame/wrp/WrapperDirective';
import { FrameTestComponent } from './components/test/layout/frame/frame-test/frame-test.component';
import { RespComponent } from './components/layout/base/resp/resp.component';
import { ScrollDirective } from './components/layout/base/scroll/ScrollDirective';
import { MaterialTypographyComponent } from './components/style/typography/material-typography/material-typography.component';
import { DialogBaseComponent } from './components/content/dialog/dialog-base/dialog-base.component';
import { CommonModule } from '@angular/common';
import { BtnDirective } from './components/content/button/BtnDirective';
import { MaterialButtonComponent } from './components/style/content/material-button/material-button.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    ArsComponent,
    ArsSliderDirective,
    ArsSliderCombComponent,
    FullScreenOverlayComponent,
    RowComponent,
    ColComponent,
    FillComponent,
    WrapperDirective,
    FrameTestComponent,
    RespComponent,
    ScrollDirective,
    MaterialTypographyComponent,
    DialogBaseComponent,
    BtnDirective,
    MaterialButtonComponent
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    A11yModule,
    MatRippleModule
  ],
  exports: [
    ArsComponent,
    ArsSliderDirective,
    ArsSliderCombComponent,
    FullScreenOverlayComponent,
    WrapperDirective,
    FrameTestComponent,
    ScrollDirective
  ],
  entryComponents: [
    DialogBaseComponent
  ]
})
export class ArsModule { }
