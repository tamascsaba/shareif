import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QrCodeModule } from 'ng-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DownloadComponent } from './download/download.component';
import { TextareaComponent } from './upload/textarea/textarea.component';
import { UploadComponent } from './upload/upload.component';

import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DownloadComponent,
    TextareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    QrCodeModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
