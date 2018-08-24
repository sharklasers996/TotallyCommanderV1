import { Injectable, EventEmitter, Output } from '@angular/core';
import { MousetrapStatic } from 'mousetrap';
import { Key } from 'src/enums/key';

@Injectable({
  providedIn: 'root'
})
export class KeystrokeServiceService {
  private mouseTrap: MousetrapStatic;

  public keyUpEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.mouseTrap = window.require("mousetrap");
  }

  public bind(key: string, callback: () => any): void {
    this.mouseTrap.bind(key, (e, c) => {
      callback();
    });
  }

  public bind2(key: string): EventEmitter<any> {
    this.mouseTrap.bind(key, (e, c) => {
      this.keyUpEvent.emit();
    });

    return this.keyUpEvent;
  }

  public bind3(key: string): EventEmitter<any> {
    var event = new EventEmitter();

    this.mouseTrap.bind(key, (e, c) => {
      e.preventDefault();
      event.emit();
    });

    return event;
  }
}
