import { Component, OnInit, Input } from '@angular/core';
import { FileBrowser } from '../../../Utils/file-browser';
import { File } from '../../../models/file';
import { PanelType } from '../../../enums/panel-type';
import { KeystrokeServiceService } from '../../services/keystroke-service.service';
import { Key } from '../../../enums/key';
import { PanelManagerServiceService } from '../../services/panel-manager-service/panel-manager-service.service';
import { FileType } from '../../../enums/file-type';

@Component({
  selector: 'tc-file-browser-panel',
  templateUrl: './file-browser-panel.component.html',
  styleUrls: ['./file-browser-panel.component.scss']
})
export class FileBrowserPanelComponent implements OnInit {

  @Input()
  public panelType: PanelType;
  public opositePanelType: PanelType;

  private itemIdentifier: string;

  public files: File[];
  public currentDirectory: File;

  private selectedFileIndex = 0;

  constructor(
    private fileBrowser: FileBrowser,
    private keystrokeService: KeystrokeServiceService,
    private panelManagerService: PanelManagerServiceService) {
  }

  private keyUp(): void {
    this.deselectFile();

    if (this.files
      && this.files.length > 0) {
      this.selectedFileIndex--;
      if (this.selectedFileIndex < 0) {
        this.selectedFileIndex = 0;
      }
    }

    this.selectFile();
    this.scrollToItem(true);
  }

  private keyDown(): void {
    this.deselectFile();

    if (this.files
      && this.files.length > 0) {
      this.selectedFileIndex++;
      if (this.selectedFileIndex >= this.files.length) {
        this.selectedFileIndex = this.files.length - 1;
      }
    }

    this.selectFile();
    this.scrollToItem(false);
  }

  ngOnInit() {
    if (this.panelType === PanelType.LeftFileBrowserPanel) {
      this.itemIdentifier = 'l';
      this.opositePanelType = PanelType.RightFileBrowserPanel;
    } else {
      this.itemIdentifier = 'r';
      this.opositePanelType = PanelType.LeftFileBrowserPanel;
    }

    this.browse('/home/ponaspx/');

    this.keystrokeService
      .bind(Key.Up, this.panelType)
      .subscribe(() => {
        this.keyUp();
      });

    this.keystrokeService
      .bind(Key.Down, this.panelType)
      .subscribe(() => {
        this.keyDown();
      });

    this.keystrokeService
      .bind(Key.Tab, this.panelType)
      .subscribe(() => {
        this.deselectFile();
        this.panelManagerService.setCurrentPanel(this.opositePanelType);
      });

    this.keystrokeService
      .bind(Key.Enter, this.panelType)
      .subscribe(() => {
        if (!this.files
          || this.files.length === 0) {
          return;
        }

        let currentFile = this.files[this.selectedFileIndex];
        if (currentFile.type === FileType.Directory) {
          this.browse(currentFile.fullName);
        }
      });

    this.panelManagerService.panelChanged.subscribe((panel) => {
      if (panel === this.panelType) {
        this.selectFile();
      }
    });

    if (this.panelManagerService.currentPanel === this.panelType) {
      this.selectFile();
    }
  }

  private browse(path: string): void {

    this.files = this.fileBrowser.browse(path);

    this.files.forEach((file: File, index: number) => {
      file.id = this.itemIdentifier + index;
    });

    this.resetFileSelection();
    this.selectFile();
  }

  private resetFileSelection(): void {
    this.selectedFileIndex = 0;
  }

  private findScrollableParent(element: HTMLElement): HTMLElement {
    let isBody: boolean,
      hasScrollableSpace: boolean,
      hasVisibleOverflow: boolean;
    do {
      element = element.parentElement;
      isBody = element === document.body;
      hasScrollableSpace = element.clientHeight < element.scrollHeight;
      hasVisibleOverflow = getComputedStyle(element, null).overflow === 'visible';
    } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));
    return element;
  }

  private deselectFile(): void {
    if (!this.files
      || this.files.length === 0) {
      return;
    }

    this.files[this.selectedFileIndex].selected = false;
  }

  private selectFile(): void {
    if (!this.files
      || this.files.length === 0) {
      return;
    }

    this.files[this.selectedFileIndex].selected = true;
  }

  private scrollToItem(up: boolean): void {
    let el = document.getElementById('file-' + this.files[this.selectedFileIndex].id);

    if (!this.isElementInViewport(el)) {
      if (up) {
        el.scrollIntoView();
      } else {
        let parent = this.findScrollableParent(el);
        let scrollHeight = el.offsetTop - parent.clientHeight + el.clientHeight;
        parent.scrollTop = scrollHeight;
      }
    }
  }

  isElementInViewport(el): boolean {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
