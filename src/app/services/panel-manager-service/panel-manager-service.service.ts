import { Injectable, Output, EventEmitter } from '@angular/core';
import { PanelType } from '../../../enums/panel-type';

@Injectable({
  providedIn: 'root'
})
export class PanelManagerServiceService {
  public currentPanel: PanelType = PanelType.RightFileBrowserPanel;

  @Output()
  public panelChanged: EventEmitter<PanelType> = new EventEmitter();

  constructor() { }

  public setCurrentPanel(panel: PanelType): void {
    this.currentPanel = panel;

    this.panelChanged.emit(this.currentPanel);
  }
}
