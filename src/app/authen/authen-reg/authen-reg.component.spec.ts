import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenRegComponent } from './authen-reg.component';

describe('AuthenRegComponent', () => {
  let component: AuthenRegComponent;
  let fixture: ComponentFixture<AuthenRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
