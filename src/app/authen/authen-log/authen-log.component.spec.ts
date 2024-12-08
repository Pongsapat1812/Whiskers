import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenLogComponent } from './authen-log.component';

describe('AuthenLogComponent', () => {
  let component: AuthenLogComponent;
  let fixture: ComponentFixture<AuthenLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
