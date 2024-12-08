import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecCComponent } from './sec-c.component';

describe('SecCComponent', () => {
  let component: SecCComponent;
  let fixture: ComponentFixture<SecCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
