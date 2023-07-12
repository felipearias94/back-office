import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoButtonComponent } from './bo-button.component';

describe('BoButtonComponent', () => {
  let component: BoButtonComponent;
  let fixture: ComponentFixture<BoButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoButtonComponent]
    });
    fixture = TestBed.createComponent(BoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
