import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-failed-modal',
  templateUrl: './failed-modal.component.html',
  styleUrl: './failed-modal.component.scss',
})
export class FailedModalComponent {
  @Input() failedMsg: any;

  constructor(public activeModal: NgbActiveModal) {}
}
