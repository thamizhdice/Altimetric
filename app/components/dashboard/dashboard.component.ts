    import { Component, OnInit, OnDestroy } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { InvestmentService } from '../../services/investment.service';
    import { Subscription } from 'rxjs';
    import { Investment } from '../../models/investment.model';
    import { NgxChartsModule } from '@swimlane/ngx-charts';
    import { RouterModule } from '@angular/router';

    @Component({
      standalone: true,
      selector: 'app-dashboard',
      templateUrl: './dashboard.component.html',
      styleUrls: ['./dashboard.component.css'],
      imports: [CommonModule, NgxChartsModule, RouterModule] // ✅ Import chart module
    })
    export class DashboardComponent implements OnInit, OnDestroy {
      totalValue: number = 0;

      // ✅ ngx-charts expects this format:
      assetAllocationChartData: { name: string; value: number }[] = [];
      investments: Investment[] = [];

      private statsSubscription!: Subscription;

      constructor(private investmentService: InvestmentService) {}

      ngOnInit(): void {
        // Fetch investments data directly from the InvestmentService
        this.statsSubscription = this.investmentService.getInvestmentStats().subscribe(stats => {
          this.totalValue = stats.totalValue;

          // ✅ Format data for ngx-charts pie chart
          this.assetAllocationChartData = Object.entries(stats.allocation).map(
            ([assetType, percent]) => ({
              name: assetType,
              value: percent
            })
          );
        });
      }

      ngOnDestroy(): void {
        this.statsSubscription?.unsubscribe();
      }
    }
