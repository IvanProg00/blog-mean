import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTagsComponent } from './change-tags.component';

describe('ChangeTagsComponent', () => {
  let component: ChangeTagsComponent;
  let fixture: ComponentFixture<ChangeTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
