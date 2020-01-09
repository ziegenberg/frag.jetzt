import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../../../../src/app/services/util/event.service';
import { DiaBase } from '../DiaBase';

@Component({
  selector: 'app-dia-content',
  templateUrl: './dia-content.component.html',
  styleUrls: ['./dia-content.component.scss']
})
export class DiaContentComponent extends DiaBase implements OnInit {

  ngOnInit() {
  }

}
