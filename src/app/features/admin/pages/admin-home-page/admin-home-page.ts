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
  filterType: string = 'all';
  
constructor (private http:HttpService,private userData:UserDataService){

}
openPointDetails(item: any) {
  // optional: open modal or navigate — left empty so it won't change current logic
}
  ngOnInit(): void {
    this.getPointsTotalCount("get-total-count-data")
  }
  getPointsTotalCount(api:string) {
    
    let areaId=Number( this.userData.getUserAreaId());
        this.http.get(`OperationDashboard/${api}/${areaId}`).subscribe(
          (res: any) => {
           debugger;
            if (res?.code == '200' && res?.isSuccess) {
              this.pointsTotalCount=res.pointsTotalCount;
            } 
    
          });
  }

   filteredPoints(value:any) {
    debugger;


  const t = this.filterType;
  if(t=='all')
    this.getPointsTotalCount('get-total-count-data');
  else if(t==='gather')
    this.getPointsTotalCount('get-total-count-gather-data');
  else if(t==='schools')
    this.getPointsTotalCount('get-total-count-school-data');
  else if(t==='payment')
    this.getPointsTotalCount('get-total-count-payment-data');


 
}

}
