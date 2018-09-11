import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { FileBrowserPanelComponent } from './components/file-browser-panel/file-browser-panel.component';
import { RenameFileTextBoxComponent } from './rename-file-text-box/rename-file-text-box.component';

@NgModule({
  declarations: [
    AppComponent,
    FileBrowserPanelComponent,
    RenameFileTextBoxComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
