import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'issues', component: IssuesComponent }
    ],
      { enableTracing: true })
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
