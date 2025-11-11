import { Component, OnInit } from '@angular/core';
import { AreaHttpService } from '../../../auth/pages/services/region-services/area-http.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-region-page',
  templateUrl: './region-page.component.html',
  styleUrl: './region-page.component.scss'
})
export class RegionPageComponent implements OnInit {
   regions:any = []
   loading:boolean=false;
   error: string | null = null;
  private destroy$ = new Subject<void>();
   sidebarOpen = false;

   constructor(
      private http: AreaHttpService,
    ) {


    }
  ngOnInit(): void {
    debugger;
   this.GetAllAreas();
  }
  GetAllAreas() {
    this.http.GetAllAreasFunc().subscribe(
          (res) => {
            this.regions=res.areas;
            
          } );
  }

   toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

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
