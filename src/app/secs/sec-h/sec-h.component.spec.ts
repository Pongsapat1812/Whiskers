import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecHComponent } from './sec-h.component';

describe('SecHComponent', () => {
  let component: SecHComponent;
  let fixture: ComponentFixture<SecHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecHComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
