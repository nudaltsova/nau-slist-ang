import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html'
})
export class ModalDialog implements OnInit {
  message: string = '';

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit() { }

  onCancel() {
    this.activeModal.dismiss();
  }

  onOk() {
    this.activeModal.close('Ok');
  }
}