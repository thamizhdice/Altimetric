import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private investments: { purchasePrice: number; assetType: string }[] = [
    { purchasePrice: 1000, assetType: 'Stocks' },
    { purchasePrice: 500, assetType: 'Bonds' }
  ];

  getInvestmentStats() {
    const totalValue = this.investments.reduce((acc, investment) => acc + investment.purchasePrice, 0);

    const allocation: { [key: string]: number } = this.investments.reduce((acc, investment) => {
      acc[investment.assetType] = (acc[investment.assetType] || 0) + investment.purchasePrice;
      return acc;
    }, {} as { [key: string]: number });

    const totalInvestment = Object.values(allocation).reduce((acc, value) => acc + value, 0);
    for (const assetType in allocation) {
      allocation[assetType] = (allocation[assetType] / totalInvestment) * 100;
    }

    return of({
      totalValue,
      allocation
    });
  }

  // ✅ Add Investment Method
  addInvestment(investment: { purchasePrice: number; assetType: string }) {
    this.investments.push(investment);
    return of(true);
  }
}
