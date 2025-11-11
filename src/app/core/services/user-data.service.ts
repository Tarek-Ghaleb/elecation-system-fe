import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  getUserRoles() {
    try {
      debugger;
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
}
