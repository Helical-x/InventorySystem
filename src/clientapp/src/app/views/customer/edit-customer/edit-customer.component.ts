import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './../../../services/customer.service';
import { Customer } from './../../../models/customer.models';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CustomerService],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('customerId');
    if (customerId) {
      this.loadCustomer(Number(customerId));
    }
  }

  loadCustomer(customerId: number): void {
    this.customerService.findCustomer(customerId).subscribe(
      customer => (this.customer = customer),
      error => console.error('Error al cargar el cliente:', error)
    );
  }

  onSubmit(): void {
    if (this.customer) {
      this.customerService.editCustomer(this.customer).subscribe(
        () => {
          console.log('Cliente actualizado');
          this.router.navigate(['/clientes']);
        },
        error => console.error('Error al actualizar el cliente:', error)
      );
    }
  }
}
