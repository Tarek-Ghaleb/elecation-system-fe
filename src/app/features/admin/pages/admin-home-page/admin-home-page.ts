import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.html',
  styleUrl: './admin-home-page.scss'
})
export class AdminHomePage implements OnInit {
  pointsTotalCount: any;
  
constructor (private http:HttpService,private userData:UserDataService){

}
openPointDetails(item: any) {
  // optional: open modal or navigate — left empty so it won't change current logic
}
  ngOnInit(): void {
    this.getPointsTotalCount()
  }
  getPointsTotalCount() {
    
    let areaId=Number( this.userData.getUserAreaId());
        this.http.get(`OperationDashboard/get-total-count-data/${areaId}`).subscribe(
          (res: any) => {
           debugger;
            if (res?.code == '200' && res?.isSuccess) {
              this.pointsTotalCount=res.pointsTotalCount;
            } 
    
          });
  }

}
