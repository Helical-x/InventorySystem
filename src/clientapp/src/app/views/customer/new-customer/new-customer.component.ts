import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './../../../services/customer.service';
import { Customer } from './../../../models/customer.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CustomerService],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})
export class NewCustomerComponent {
  customer: Customer = {
    customerId: 0,
    customerName: null,
    customerAddress: null,
    deliveries: null
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  onSubmit() {
    this.customerService.createCustomer(this.customer).subscribe(
      response => {
        console.log('Cliente creado:', response);
        this.router.navigate(['/clientes']);
      },
      error => {
        console.error('Error al crear el cliente:', error);
      }
    );
  }

}
