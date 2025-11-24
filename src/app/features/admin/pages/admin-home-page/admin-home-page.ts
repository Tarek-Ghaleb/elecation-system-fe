import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { UserDataService } from '../../../../core/services/user-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordModelComponent } from '../../../../shared/components/change-password-model/change-password-model.component';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.html',
  styleUrl: './admin-home-page.scss'
})
export class AdminHomePage implements OnInit {
  pointsTotalCount: any;
  filterType: string = 'all';
  private modalService = inject(NgbModal);
  
constructor (private http:HttpService,private userData:UserDataService){
  debugger;
// var loggedIdUser = this.userData.getUserData();
//     if (loggedIdUser["IsConfirm"] == "False") {
//       this.openChangePassword();
//     }
}

 openChangePassword() {
    const modalRef = this.modalService.open(ChangePasswordModelComponent, {
      backdrop: 'static', // prevent closing on outside click
      keyboard: false,    // prevent closing with ESC
      centered: true,
      size: 'md'          // responsive size
    });

    modalRef.result.then(
      (result) => {
        console.log('Password changed:', result);
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
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
