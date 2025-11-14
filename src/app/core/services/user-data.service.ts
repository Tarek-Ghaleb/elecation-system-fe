import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  getUserRoles() {
    try {
      let token = localStorage.getItem('User');
      if (token != null) {
        const parsedData = jwtDecode<any>(token);
        return parsedData[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      }
    } catch (error) {
      return null;
    }
  }

  getUserId(){
      try {
      let token = localStorage.getItem('User');
      if (token != null) {
        const parsedData = jwtDecode<any>(token);
        return parsedData['Id'];
      }
    } catch (error) {
      return null;
    }
  }

  getUserAreaId(){
      try {
    
      let token = localStorage.getItem('User');
      if (token != null) {
      
        const parsedData = jwtDecode<any>(token);
        return parsedData['AreaId'];
      }
    } catch (error) {
      return null;
    }
  }

  getUserData(){
     try {
    
      let token = localStorage.getItem('User');
      if (token != null) {
      
        const parsedData = jwtDecode<any>(token);
        return parsedData;
      }
    } catch (error) {
      return null;
    }
  }


}
