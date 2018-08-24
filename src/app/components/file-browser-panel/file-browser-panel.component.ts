import { Component, OnInit, Input } from '@angular/core';
import { FileBrowser } from 'src/Utils/file-browser';
import { File } from "../../../models/file";
import { Windows } from '../../../enums/windows';
import { KeystrokeServiceService } from 'src/app/services/keystroke-service.service';
import { Key } from '../../../enums/key';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'tc-file-browser-panel',
  templateUrl: './file-browser-panel.component.html',
  styleUrls: ['./file-browser-panel.component.scss']
})
export class FileBrowserPanelComponent implements OnInit {

  @Input()
  public windowType: Windows;

  public files: File[];

  private selectedFileIndex: number = 0;

  private fileId: number = 1;

  private ku: any;

  constructor(
    private fileBrowser: FileBrowser,
    private keystrokeService: KeystrokeServiceService
  ) {
    this.files = fileBrowser.browse('/home/ponaspx/');

    this.files.forEach((file: File, index: number) => {
      file.id = index;
    });

    this.keystrokeService
      .bind3(Key.Up)
      .subscribe(() => {
        this.keyUp();
      });

    this.keystrokeService
      .bind3(Key.Down)
      .subscribe(() => {
        this.keyDown();
      });
  }

  private keyUp(): void {
    this.deselectFile();

    this.selectedFileIndex--;
    if (this.selectedFileIndex < 0) {
      this.selectedFileIndex = 0;
    }

    this.selectFile();
  }

  private keyDown(): void {
    this.deselectFile();

    this.selectedFileIndex++;
    if (this.selectedFileIndex >= this.files.length) {
      this.selectedFileIndex = this.files.length - 1;
    }

    this.selectFile();
  }

  ngOnInit() {
    // if (this.windowType == Windows.LeftFileBrowserPanel) {
    //   this.doScroll();

    // }
  }

  private doScroll(): void {
    setTimeout(() => {
      var el = document.getElementById('file-' + this.fileId);
      el.scrollIntoView();
      this.fileId++;

      if (this.fileId < 50) {
        this.doScroll();
      }
    }, 1000);
  }

  private deselectFile(): void {
    this.files[this.selectedFileIndex].selected = false;
  }

  private selectFile(): void {
    this.files[this.selectedFileIndex].selected = true;

    var el = document.getElementById('file-' + this.files[this.selectedFileIndex].id);
    var d = document.getElementById('desra');

    if (!this.isElementInViewport(el)) {
      //el.scrollIntoView({ behavior: "smooth" });
      //el.scrollIntoView();

      window.scrollTo(0, 100);
      // d.scrollBy(0, el.scrollHeight);
      //window.scrollBy(0, 100);
    }

  }

  private isElementInViewport(el): boolean {
    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }
}
