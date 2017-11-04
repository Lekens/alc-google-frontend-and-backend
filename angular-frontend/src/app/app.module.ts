import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { ContentComponent } from './students/view/content/content.component';
import {StudentService} from './shared/services/student/student.service';
import {ApiService} from './shared/services/api/api.service';
import { AddStudentComponent } from './students/view/add-student/add-student/add-student.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListStudentComponent } from './students/view/list-student/list-student.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    ContentComponent,
    AddStudentComponent,
    ListStudentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [StudentService, ApiService, ListStudentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
