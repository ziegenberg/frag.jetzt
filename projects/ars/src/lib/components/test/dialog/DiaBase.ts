import { Input } from '@angular/core';
import { EventService } from '../../../../../../../src/app/services/util/event.service';


export class DiaBase {

  public static eventService:EventService;

  @Input() key:any;

  public closeDialog(){
    DiaBase.eventService.broadcast(this.key);
  }

}
