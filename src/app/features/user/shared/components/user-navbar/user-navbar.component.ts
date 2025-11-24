import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.scss'
})
export class UserNavbarComponent {
  lang = localStorage.getItem('language') || 'ar';

    constructor(private router: Router, private translate: TranslateService) {}
  
    changeLanguage(lang: any) {
    switch (lang) {
      case 'en':
        this.translate.use('en');
        localStorage.setItem('language', 'en');
        break;
      case 'ar':
        this.translate.use('ar');
        localStorage.setItem('language', 'ar');
        break;

      default:
        break;
    }
    location.reload();
  }

      logout() {
    localStorage.removeItem('User');
    localStorage.removeItem('UserName');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
