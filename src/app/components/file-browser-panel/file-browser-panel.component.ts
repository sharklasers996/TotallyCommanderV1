import { Component, OnInit, Input } from '@angular/core';
import { FileBrowser } from '../../../Utils/file-browser';
import { File } from '../../../models/file';
import { PanelType } from '../../../enums/panel-type';
import { KeystrokeServiceService } from '../../services/keystroke-service.service';
import { Key } from '../../../enums/key';
import { PanelManagerServiceService } from '../../services/panel-manager-service/panel-manager-service.service';
import { FileType } from '../../../enums/file-type';
import { FileBrowserTab } from './models/file-browser-tab';

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
  public totalFiles: number;
  public totalDirectories: number;

  public tabs: FileBrowserTab[] = [new FileBrowserTab()];
  private currentTabIndex: number = 0;

  private readonly pageSize: number = 10;

  public get currentTab(): FileBrowserTab {
    return this.tabs[this.currentTabIndex];
  }

  constructor(
    private fileBrowser: FileBrowser,
    private keystrokeService: KeystrokeServiceService,
    private panelManagerService: PanelManagerServiceService) {
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
        this.currentTab.incrementSelectionIndex();
      });

    this.keystrokeService
      .bind(Key.Down, this.panelType)
      .subscribe(() => {
        this.currentTab.decrementSelectionIndex();
      });

    this.keystrokeService
      .bind(Key.PageUp, this.panelType)
      .subscribe(() => {
        this.currentTab.incrementSelectionIndex(this.pageSize);
      });

    this.keystrokeService
      .bind(Key.PageDown, this.panelType)
      .subscribe(() => {
        this.currentTab.decrementSelectionIndex(this.pageSize);
      });

    this.keystrokeService
      .bind(Key.Home, this.panelType)
      .subscribe(() => {
        this.currentTab.goToBeginningOfList();
      });

    this.keystrokeService
      .bind(Key.End, this.panelType)
      .subscribe(() => {
        this.currentTab.goToEndOfList();
      });

    this.keystrokeService
      .bind(Key.Tab, this.panelType)
      .subscribe(() => {
        this.currentTab.deselectFile();
        this.panelManagerService.setCurrentPanel(this.opositePanelType);
      });

    this.keystrokeService
      .bind(Key.Enter, this.panelType)
      .subscribe(() => {
        let selectedFile = this.currentTab.getSelectedFile();
        if (selectedFile
          && selectedFile.type === FileType.Directory) {
          this.browse(selectedFile.fullName);
        }
      });

    this.keystrokeService
      .bind(Key.Backspace, this.panelType)
      .subscribe(() => {
        let p = window.require('path');
        let parentDir = p.resolve(this.currentTab.currentDirectory.fullName, '..');
        this.browse(parentDir);
      });


    this.keystrokeService
      .bind(Key.Ctrl_T, this.panelType)
      .subscribe(() => {
        let newTab = new FileBrowserTab();
        this.tabs.push(newTab);
        this.currentTabIndex = this.tabs.length - 1;
        this.selectTab();
        this.browse(this.currentDirectory.fullName);
      });

    this.keystrokeService
      .bind(Key.Ctrl_Tab, this.panelType)
      .subscribe(() => {
        this.incrementTabSelectionIndex();
      });

    this.keystrokeService
      .bind(Key.Ctrl_Shift_Tab, this.panelType)
      .subscribe(() => {
        this.decerementTabSelectionIndex();
      });

    this.keystrokeService
      .bind(Key.Ctrl_W, this.panelType)
      .subscribe(() => {
        if (this.tabs.length === 1) {
          return;
        }

        this.tabs = this.tabs.filter((tab, currentIndex) => {
          if (currentIndex !== this.currentTabIndex) {
            return tab;
          }
        });

        if (this.currentTabIndex >= this.tabs.length) {
          this.currentTabIndex--;
        }

        this.selectTab();
      });

    this.panelManagerService.panelChanged.subscribe((panel) => {
      if (panel === this.panelType) {
        this.currentTab.selectFile();
      }
    });

    if (this.panelManagerService.currentPanel === this.panelType) {
      this.currentTab.selectFile();
    }
  }

  private incrementTabSelectionIndex(): void {
    this.currentTabIndex++;
    if (this.currentTabIndex >= this.tabs.length) {
      this.currentTabIndex = 0;
    }

    this.selectTab();
  }

  private decerementTabSelectionIndex(): void {
    this.currentTabIndex--;
    if (this.currentTabIndex < 0) {
      this.currentTabIndex = this.tabs.length - 1;
    }

    this.selectTab();
  }

  private selectTab() {
    this.tabs.forEach(t => {
      t.active = false;
    });

    this.tabs[this.currentTabIndex].activeTab();
  }

  private browse(path: string): void {

    let p = window.require('path');
    let parentDir = p.resolve(path, '..');
    console.log(path);
    console.log(parentDir);

    this.currentDirectory = this.fileBrowser.getFileInfo(path);

    this.files = this.fileBrowser.browse(path);

    this.files.forEach((file: File, index: number) => {
      file.id = this.itemIdentifier + this.currentTabIndex + index;
    });

    this.currentTab.setFiles(this.files);
    this.currentTab.setCurrentDirectory(this.currentDirectory);
    this.selectTab();
  }
}
