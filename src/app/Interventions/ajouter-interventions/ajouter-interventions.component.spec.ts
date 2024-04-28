import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterInterventionsComponent } from './ajouter-interventions.component';

describe('AjouterInterventionsComponent', () => {
  let component: AjouterInterventionsComponent;
  let fixture: ComponentFixture<AjouterInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterInterventionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
