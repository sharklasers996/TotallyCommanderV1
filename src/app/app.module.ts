import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { FileBrowserPanelComponent } from './components/file-browser-panel/file-browser-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    FileBrowserPanelComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
