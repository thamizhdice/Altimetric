import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Investment } from '../../models/investment.model';
import { InvestmentService } from '../../services/investment.service';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-investment-form',
    templateUrl: './investment-form.component.html',
    styleUrls: ['./investment-form.component.css'],
    imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class InvestmentFormComponent {
    investmentForm: FormGroup;
    errorMessage: string | null = null; // Add error message property

    constructor(
        private fb: FormBuilder,
        private investmentService: InvestmentService
    ) {
        this.investmentForm = this.fb.group({
            assetType: ['', Validators.required],
            quantity: [null, [Validators.required, Validators.min(1)]],
            purchasePrice: [null, [Validators.required, Validators.min(0)]],
            purchaseDate: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.investmentForm.valid) {
            this.errorMessage = null; // Clear any previous errors

            const investment: Investment = {
                ...this.investmentForm.value,
                purchaseDate: new Date(this.investmentForm.value.purchaseDate)
            };

            this.investmentService.addInvestment(investment).subscribe(() => {
                this.investmentForm.reset();
            });
        } else {
            this.errorMessage = 'Please correct the errors in the form.';
            this.investmentForm.markAllAsTouched();
        }
    }
}
