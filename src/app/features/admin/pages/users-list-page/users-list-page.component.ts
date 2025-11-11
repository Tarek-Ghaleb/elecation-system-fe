import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss'
})
export class UsersListPageComponent {
users = [
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
