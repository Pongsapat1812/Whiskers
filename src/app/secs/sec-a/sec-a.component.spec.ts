import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAComponent } from './sec-a.component';

describe('SecAComponent', () => {
  let component: SecAComponent;
  let fixture: ComponentFixture<SecAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
