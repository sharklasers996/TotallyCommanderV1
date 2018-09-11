import { Injectable, Output, EventEmitter } from '@angular/core';
import { PanelType } from '../../../enums/panel-type';

@Injectable({
  providedIn: 'root'
})
export class PanelManagerServiceService {
  public currentPanel: PanelType = PanelType.RightFileBrowserPanel;

  private panelHistory: PanelType[] = [PanelType.RightFileBrowserPanel];

  @Output()
  public panelChanged: EventEmitter<PanelType> = new EventEmitter();

  constructor() { }

  public setCurrentPanel(panel: PanelType): void {
    this.panelHistory.push(panel);
    this.currentPanel = panel;

    this.panelChanged.emit(this.currentPanel);
  }

  public goToPreviousPanel(): void {
    let previousPanel = this.panelHistory[this.panelHistory.length - 2];
    this.setCurrentPanel(previousPanel);
  }
}
