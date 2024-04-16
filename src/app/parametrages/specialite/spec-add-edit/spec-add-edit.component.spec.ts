import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecAddEditComponent } from './spec-add-edit.component';

describe('SpecAddEditComponent', () => {
  let component: SpecAddEditComponent;
  let fixture: ComponentFixture<SpecAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
