import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GignupComponent } from './gignup.component';

describe('GignupComponent', () => {
  let component: GignupComponent;
  let fixture: ComponentFixture<GignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
