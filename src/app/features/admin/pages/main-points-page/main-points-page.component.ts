import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainPoints } from '../../interfaces/admin.interfaces';

@Component({
  selector: 'app-main-points-page',
  templateUrl: './main-points-page.component.html',
  styleUrl: './main-points-page.component.scss'
})
export class MainPointsPageComponent {
points: MainPoints[] = [
    { id: 1, title: 'Point One', description: 'Description for point one.' },
    { id: 2, title: 'Point Two', description: 'Description for point two.' },
    { id: 3, title: 'Point Three', description: 'Description for point three.' }
  ];

  	private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');

  mainPoints:MainPoints[] = []
  page = 1;
	pageSize = 4;

   constructor() {
    this.refreshCountries();
  }

  refreshCountries() {
    const start = (this.page - 1) * this.pageSize;
    this.mainPoints = this.points.slice(start, start + this.pageSize);
  }

  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.page = 1;
    this.refreshCountries();
  }

  	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }

  submitAdd(){}

  submitEdit(){}

  submitDelete(){}
}
