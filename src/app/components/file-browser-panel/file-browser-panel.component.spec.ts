import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowserPanelComponent } from './file-browser-panel.component';

describe('FileBrowserPanelComponent', () => {
  let component: FileBrowserPanelComponent;
  let fixture: ComponentFixture<FileBrowserPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileBrowserPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBrowserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
