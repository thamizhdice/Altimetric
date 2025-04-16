import { TestBed } from '@angular/core/testing';
import { InvestmentService } from './investment.service';  // Ensure correct import path
import { of } from 'rxjs';

describe('InvestmentService', () => {
  let service: InvestmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestmentService] // Provide the actual service
    });
    service = TestBed.inject(InvestmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addInvestment and return an observable', () => {
    const investmentData = {
      assetType: 'Gold',
      quantity: 50,
      purchasePrice: 1000,
      purchaseDate: '2025-03-20'
    };

    // Spy on the addInvestment method
    spyOn(service, 'addInvestment').and.returnValue(of(investmentData));

    service.addInvestment(investmentData).subscribe(response => {
      expect(response).toEqual(investmentData);  // Check if the returned value matches the expected data
    });
    expect(service.addInvestment).toHaveBeenCalledWith(investmentData);  // Ensure the method was called with correct data
  });
});
