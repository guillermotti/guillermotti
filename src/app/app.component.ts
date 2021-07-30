import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDark = false;
  textButton = 'Heck, bring me dark';
  arrowSvg = 'M11.8 13.2l-1.4-2.83-6.83 3.94L.2 8.46l6.83-3.94-1.76-2.64L7.78.43l8.34 2.73-1.8 8.6-2.52 1.45zm1.68-1.65l1.72-7.86-7.66-2.43 2.02 3.1-6.75 3.9 2.24 3.88 6.75-3.9 1.68 3.3z';

  changeMode() {
    this.isDark = !this.isDark;
    this.textButton = this.textButton.includes('Heck') ? 'Dude, turn lights on' : 'Heck, bring me dark';
  }
}
