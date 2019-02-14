import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { StudioComponent } from './components/studio/studio.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AddEditScheduleComponent } from './components/add-edit-schedule/add-edit-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    StudioComponent,
    ScheduleComponent,
    AddEditScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
