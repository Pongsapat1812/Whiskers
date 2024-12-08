import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecBComponent } from './sec-b.component';

describe('SecBComponent', () => {
  let component: SecBComponent;
  let fixture: ComponentFixture<SecBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
