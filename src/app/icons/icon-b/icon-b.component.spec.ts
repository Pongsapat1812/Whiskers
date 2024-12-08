import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBComponent } from './icon-b.component';

describe('IconBComponent', () => {
  let component: IconBComponent;
  let fixture: ComponentFixture<IconBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
