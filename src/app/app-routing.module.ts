import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path : '', component : UploadComponent},
  {path: ':id/:key', component: DownloadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
