import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccCredComponent } from './acc-cred.component';

describe('AccCredComponent', () => {
  let component: AccCredComponent;
  let fixture: ComponentFixture<AccCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccCredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
