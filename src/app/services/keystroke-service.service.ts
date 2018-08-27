import { Injectable, EventEmitter, Output } from '@angular/core';
import { MousetrapStatic } from 'mousetrap';
import { Key } from '../../enums/key';
import { PanelType } from '../../enums/panel-type';
import { PanelManagerServiceService } from './panel-manager-service/panel-manager-service.service';

@Injectable({
  providedIn: 'root'
})
export class KeystrokeServiceService {
  private keyMap = [];
  private mouseTrap: MousetrapStatic;

  public keyUpEvent: EventEmitter<any> = new EventEmitter();

  constructor(private panelManagerService: PanelManagerServiceService) {
    this.mouseTrap = window.require('mousetrap');
  }

  public bind(key: string, panel: PanelType): EventEmitter<any> {
    console.log('Subscribed', key, panel);
    let event = new EventEmitter();

    this.keyMap.push([key, panel, event]);

    this.mouseTrap.bind(key, (e, c) => {

      let currentPanel = this.keyMap.find(item => {
        return item[0] === key
          && item[1] === this.panelManagerService.currentPanel;
      });

      e.preventDefault();

      currentPanel[2].emit();
    });

    return event;
  }
}
