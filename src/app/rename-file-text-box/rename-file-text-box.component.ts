import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { resolve } from 'path';
import { Observable, Subscriber } from 'rxjs';
import { PanelType } from '../../enums/panel-type';
import { PanelManagerServiceService } from '../services/panel-manager-service/panel-manager-service.service';
import { KeystrokeServiceService } from '../services/keystroke-service.service';
import { Key } from '../../enums/key';
import { on } from 'cluster';

@Component({
  selector: 'tc-rename-file-text-box',
  templateUrl: './rename-file-text-box.component.html',
  styleUrls: ['./rename-file-text-box.component.scss']
})
export class RenameFileTextBoxComponent implements OnInit {

  @ViewChild('textBox') textboxElement: ElementRef;

  public visible: boolean = false;

  public input: string;

  public inputHeight: number;
  public inputTop: number;

  private subscriber: Subscriber<any>;

  constructor(
    private panelManagerService: PanelManagerServiceService,
    private keystrokeService: KeystrokeServiceService) { }

  ngOnInit() {
    this.keystrokeService
      .bind(Key.Enter, PanelType.RenameFileTextbox)
      .subscribe(() => {
        this.submit();
      });

    this.keystrokeService
      .bind(Key.Escape, PanelType.RenameFileTextbox)
      .subscribe(() => {
        this.cancel();
      });
  }

  public showOn(positionElement: HTMLElement): Observable<string> {
    this.visible = true;
    this.panelManagerService.setCurrentPanel(PanelType.RenameFileTextbox);

    this.inputHeight = positionElement.getBoundingClientRect().height;
    this.inputTop = positionElement.getBoundingClientRect().top;

    this.focus();

    return new Observable<string>(obs => {
      this.subscriber = obs;
    });
  }

  private focus(): void {
    if (this.textboxElement) {
      this.textboxElement.nativeElement.focus();
    } else {
      setTimeout(() => {
        this.focus();
      }, 10);
    }
  }

  private submit(): void {
    this.subscriber.next(this.input);
  }

  private cancel(): void {

  }

  public keydown(event: any): void {
    console.log();
    if (event.keyCode === 13) {
      this.visible = false;
      this.submit();
      this.panelManagerService.goToPreviousPanel();
    } else if (event.keyCode === 27) {
      this.visible = false;
      this.cancel();
      this.panelManagerService.goToPreviousPanel();
    }
  }
}
