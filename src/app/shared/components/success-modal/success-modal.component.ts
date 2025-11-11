import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss',
})
export class SuccessModalComponent {
  @Input() successTitle: any;
  @Input() successMsg: any;
  @Input() showOnlyClose: boolean = false;
  @Input() btnText: any;

  constructor(public activeModal: NgbActiveModal) {}
}
