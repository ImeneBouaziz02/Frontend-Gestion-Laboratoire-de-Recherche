import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolFormComponent } from './tool-form.component';

describe('ToolFormComponent', () => {
  let component: ToolFormComponent;
  let fixture: ComponentFixture<ToolFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolFormComponent]
    });
    fixture = TestBed.createComponent(ToolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
