import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-action-buttons',
  templateUrl: './dialog-action-buttons.component.html',
  styleUrls: ['./dialog-action-buttons.component.scss']
})
export class DialogActionButtonsComponent implements OnInit {

  /**
   * The button labels section.
   */
  @Input() buttonsLabelSection: string;


  /**
   * The confirm button label.
   */
  @Input() confirmButtonLabel: string;


  /**
   * A callback which will be executed if the confirm button was clicked.
   */
  @Input() confirmButtonClickAction: Function;


  /**
   * A callback which will be executed if the cancel button was clicked.
   */
  @Input() cancelButtonClickAction: Function;


  /**
   * The ARIA identifier prefix.
   */
  private ariaPrefix: string = (new Date().getTime().toString());


  /**
   * @inheritDoc
   */
  ngOnInit() {
    // nothing special yet
  }


  /**
   * Performs the confirm button click action.
   */
  public performConfirmButtonClickAction(): void {
    this.confirmButtonClickAction();
  }


  /**
   * Performs the cancel button click action.
   */
  public performCancelButtonClickAction(): void {
    this.cancelButtonClickAction();
  }
}
