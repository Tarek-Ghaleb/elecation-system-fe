import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  lang = localStorage.getItem('language');
  isDashboardAccordionExpanded: boolean = false;
  isUserAccordionExpanded: boolean = false;
  dashboardRoutes = [
    'admin/main-points',
    'admin/pay-points',
    'admin/schools',
    'admin/areas',
    'admin/source-data',
    'admin/active-gather-data'


  ];

  userRoutes = [
   'admin/users-list',
  ];

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit() {
    this.checkAccordionRoutes();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateAccordionState(event.urlAfterRedirects);
      }
    });
  }

  updateAccordionState(currentUrl: string) {
    this.isDashboardAccordionExpanded = this.dashboardRoutes.some((route) =>
      currentUrl.includes(route)
    );
    this.isUserAccordionExpanded = this.userRoutes.some((route) =>
      currentUrl.includes(route)
    );
  }

  checkAccordionRoutes() {
    this.isDashboardAccordionExpanded = this.dashboardRoutes.some((route) =>
      this.router.url.includes(route)
    );
    this.isUserAccordionExpanded = this.userRoutes.some((route) =>
      this.router.url.includes(route)
    );
  }

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

  navigateToPage(pageURL: any) {
    if (!this.dashboardRoutes.includes(pageURL)) {
      this.isDashboardAccordionExpanded = false;
    }
    if (!this.userRoutes.includes(pageURL)) {
      this.isUserAccordionExpanded = false;
    }
    this.router.navigate([pageURL]);
  }

  getBackground(url: any[]) {
    if (url?.length > 1) {
      return url.some((a) => this.router.url?.includes(a)) ? '#E5F0FF' : '#FFF';
    } else {
      return this.router.url?.includes(url[0]) ? '#E5F0FF' : '#FFF';
    }
  }

  getIconColor(url: any[]) {
    if (url?.length > 1) {
      return url.some((a) => this.router.url?.includes(a))
        ? '#062F6D'
        : '#666666';
    } else {
      return this.router.url?.includes(url[0]) ? '#062F6D' : '#666666';
    }
  }

    logout() {
    localStorage.removeItem('User');
    localStorage.removeItem('UserName');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
