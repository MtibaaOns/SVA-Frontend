import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilAddEditComponent } from './util-add-edit.component';

describe('UtilAddEditComponent', () => {
  let component: UtilAddEditComponent;
  let fixture: ComponentFixture<UtilAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
