import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocAddEditComponent } from './soc-add-edit.component';

describe('SocAddEditComponent', () => {
  let component: SocAddEditComponent;
  let fixture: ComponentFixture<SocAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
