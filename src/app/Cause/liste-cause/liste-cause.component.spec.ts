import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCauseComponent } from './liste-cause.component';

describe('ListeCauseComponent', () => {
  let component: ListeCauseComponent;
  let fixture: ComponentFixture<ListeCauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCauseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
