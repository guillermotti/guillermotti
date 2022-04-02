import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  isDark: boolean;
  textButton: string;

  constructor(private scully: ScullyRoutesService) {
    this.isDark = localStorage.getItem('isDark') === 'true';
    this.textButton = localStorage.getItem('isDark') === 'true' ? 'Dude, turn lights on' : 'Heck, bring me dark';
  }

  $blogPosts = this.scully.available$.pipe(
    map(routes =>
      routes.filter(
        route =>
          route.route.startsWith('/blog/') && route.sourceFile && route.sourceFile.endsWith('.md')
      )
    )
  );

  changeMode() {
    this.isDark = !this.isDark;
    this.textButton = this.textButton.includes('Heck') ? 'Dude, turn lights on' : 'Heck, bring me dark';
    localStorage.setItem('isDark', this.isDark.toString());
  }

}
