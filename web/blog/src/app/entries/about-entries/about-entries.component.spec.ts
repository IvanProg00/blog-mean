import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEntriesComponent } from './about-entries.component';

describe('AboutEntriesComponent', () => {
  let component: AboutEntriesComponent;
  let fixture: ComponentFixture<AboutEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
