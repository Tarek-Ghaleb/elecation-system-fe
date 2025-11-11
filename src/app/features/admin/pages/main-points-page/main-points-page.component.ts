import { Component } from '@angular/core';

@Component({
  selector: 'app-main-points-page',
  templateUrl: './main-points-page.component.html',
  styleUrl: './main-points-page.component.scss'
})
export class MainPointsPageComponent {
mainPoints = [
    { id: 1, title: 'Point One', description: 'Description for point one.' },
    { id: 2, title: 'Point Two', description: 'Description for point two.' },
    { id: 3, title: 'Point Three', description: 'Description for point three.' }
  ];

  onAdd(): void {
    console.log(`Add point`);
  }

  onEdit(pointId: number): void {
    console.log(`Edit point with ID: ${pointId}`);
  }

  onDelete(pointId: number): void {
    console.log(`Delete point with ID: ${pointId}`);
  }
}
