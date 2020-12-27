import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEntriesComponent } from './change-entries.component';

describe('ChangeEntriesComponent', () => {
  let component: ChangeEntriesComponent;
  let fixture: ComponentFixture<ChangeEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
