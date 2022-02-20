import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { UtterancesDirective } from '../utterances.directive';


@NgModule({
  declarations: [
    BlogComponent,
    BlogPostComponent,
    UtterancesDirective
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ScullyLibModule
  ]
})
export class BlogModule { }
