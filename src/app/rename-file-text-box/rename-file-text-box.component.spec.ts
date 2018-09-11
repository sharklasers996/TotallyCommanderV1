import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameFileTextBoxComponent } from './rename-file-text-box.component';

describe('RenameFileTextBoxComponent', () => {
  let component: RenameFileTextBoxComponent;
  let fixture: ComponentFixture<RenameFileTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameFileTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameFileTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
