import { DialogInstance } from '../../models/dialog/DialogInstance';
import { Observable, Observer, PartialObserver } from 'rxjs';
import { DiaInstance } from './DiaBuilder';
import { DiaOverlayComponent } from './dialog/dia-overlay/dia-overlay.component';

export interface Consumer<T> {
  (e: T): void;
}

export interface VoidConsumer {
  (): void;
}

export class Dia<T> {

  constructor(
    private closeObservable: Observable<void>,
    private dialog: DiaInstance<T>,
    private dialogBackground?: DiaInstance<DiaOverlayComponent>,
  ) {
  }

  public onClose(action: Consumer<Dia<T>>): Dia<T> {
    this.closeObservable.subscribe(() => action(this));
    return this;
  }

  public detach(){
    this.dialog.detach();
    if(this.dialogBackground)this.dialogBackground.detach();
  }

}
