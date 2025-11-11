import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, TranslateDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  textDir = 'rtl';
  language: any = localStorage.getItem('language') ?? 'ar';
  browserLang: any;

  constructor(private translate: TranslateService) {
    this.handleLanguageConfigs();
  }

  handleLanguageConfigs() {
    this.translate.addLangs(['ar', 'en']);
    this.browserLang = this.translate.getBrowserLang();
    this.translate.setDefaultLang(
      this.language?.match(/ar|ar-SA/) ? 'ar' : 'en'
    );

    if (this.language === 'ar') {
      this.textDir = 'rtl';
    } else if (this.language === 'en') {
      this.textDir = 'ltr';
    } else {
      this.textDir = 'rtl';
    }
    localStorage.setItem('language', this.language);
    this.translate.use(this.language);
  }
}
