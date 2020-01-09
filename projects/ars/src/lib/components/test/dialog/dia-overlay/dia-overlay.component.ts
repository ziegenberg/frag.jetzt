import { Component, Input, OnInit, Output } from '@angular/core';
import { EventService } from '../../../../../../../../src/app/services/util/event.service';
import { DiaBase } from '../DiaBase';

@Component({
  selector: 'ars-dia-overlay',
  templateUrl: './dia-overlay.component.html',
  styleUrls: ['./dia-overlay.component.scss']
})
export class DiaOverlayComponent extends DiaBase implements OnInit {

  ngOnInit() {
  }

}
