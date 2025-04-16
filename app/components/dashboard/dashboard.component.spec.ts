import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const mockStats = {
    totalValue: 15000,
    allocation: { Stocks: 60, Bonds: 40 }
  };

  let mockStore: any;

  beforeEach(async () => {
    // Create a mock store to simulate the store behavior
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: Store, useValue: mockStore } // Use mock store in place of the actual Store
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // Mock the store.select method to return the mock data
    mockStore.select.and.returnValue(of(mockStats));
    spyOn(mockStore, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadInvestments on ngOnInit', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.any(Object)); // Replace with actual action if needed
  });

  it('should update totalValue and assetAllocationChartData from store', () => {
    expect(component.totalValue).toEqual(mockStats.totalValue);
    expect(component.assetAllocationChartData).toEqual([
      { name: 'Stocks', value: 60 },
      { name: 'Bonds', value: 40 }
    ]);
  });

  it('should unsubscribe from statsSubscription on ngOnDestroy', () => {
    spyOn(component['statsSubscription'], 'unsubscribe'); // Access private property for testing
    component.ngOnDestroy();
    expect(component['statsSubscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should have default value if store returns empty data', () => {
    mockStore.select.and.returnValue(of({
      totalValue: 0,
      allocation: {}
    }));
    fixture.detectChanges(); // Ensure component is updated after changing the store
    expect(component.totalValue).toEqual(0);
    expect(component.assetAllocationChartData).toEqual([]);
  });
});
