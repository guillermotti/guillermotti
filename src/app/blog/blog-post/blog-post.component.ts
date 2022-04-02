import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {

  isDark: boolean;
  textButton: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService
  ) {
    this.isDark = localStorage.getItem('isDark') === 'true';
    this.textButton = localStorage.getItem('isDark') === 'true' ? 'Dude, turn lights on' : 'Heck, bring me dark';
  }

  $blogPostMetadata = combineLatest([
    this.activatedRoute.params.pipe(pluck('postId')),
    this.scully.available$
  ]).pipe(
    map(([postId, routes]) =>
      routes.find(route => route.route === `/blog/${postId}`)
    )
  );

  changeMode() {
    this.isDark = !this.isDark;
    this.textButton = this.textButton.includes('Heck') ? 'Dude, turn lights on' : 'Heck, bring me dark';
    localStorage.setItem('isDark', this.isDark.toString());
  }

}
