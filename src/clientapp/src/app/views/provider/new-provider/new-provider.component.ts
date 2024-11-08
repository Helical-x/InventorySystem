import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProviderService } from '../../../services/provider.service';
import { Router } from '@angular/router';
import { Provider } from './../../../models/provider.models';

@Component({
  selector: 'app-new-provider',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProviderService],
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.scss']
})
export class NewProviderComponent {
  provider: Provider = {
    providerId: 0,
    providerName: null,
    providerAddress: null,
    orders: []
  };

  constructor(
    private providerService: ProviderService,
    private router: Router
  ) {}

  onSubmit() {
    this.providerService.createProvider(this.provider).subscribe(
      response => {
        console.log('Proveedor creado:', response);
        this.router.navigate(['/providers']); // Navegar a la lista de proveedores después de la creación
      },
      error => {
        console.error('Error al crear el proveedor:', error);
      }
    );
  }
}
