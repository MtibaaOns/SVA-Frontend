import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCauseComponent } from './ajouter-cause.component';

describe('AjouterCauseComponent', () => {
  let component: AjouterCauseComponent;
  let fixture: ComponentFixture<AjouterCauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterCauseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
