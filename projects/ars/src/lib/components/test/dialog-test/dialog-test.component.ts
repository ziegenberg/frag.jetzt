import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../../../src/app/services/util/event.service';
import { DiaBuilder, DiaInstance } from '../DiaBuilder';
import { DiaContentComponent } from '../dialog/dia-content/dia-content.component';
import { Consumer } from '../Dia';

@Component({
  selector: 'ars-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss']
})
export class DialogTestComponent implements OnInit,AfterViewInit {

  constructor(private eventService:EventService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.eventService.on("test").subscribe(()=>{
      console.log('REEEE');
    });
  }

  createDialog(){
    DiaBuilder.createDialog("TestDialog",DiaContentComponent)
      .onClose(action=>action.detach());
  }

  broad(){
    this.eventService.broadcast("test");
  }

}
