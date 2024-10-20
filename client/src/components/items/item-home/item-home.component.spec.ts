import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemHomeComponent } from './item-home.component';

describe('ItemHomeComponent', () => {
  let component: ItemHomeComponent;
  let fixture: ComponentFixture<ItemHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
