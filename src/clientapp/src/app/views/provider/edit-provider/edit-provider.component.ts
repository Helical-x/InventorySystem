import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProviderService } from '../../../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from './../../../models/provider.models';

@Component({
  selector: 'app-edit-provider',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProviderService],
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {
  provider: Provider | undefined;

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const providerId = this.route.snapshot.paramMap.get('providerId');
    if (providerId) {
      this.loadProvider(Number(providerId));
    }
  }

  loadProvider(providerId: number): void {
    this.providerService.findProvider(providerId).subscribe(
      provider => (this.provider = provider),
      error => console.error('Error al cargar el proveedor:', error)
    );
  }

  onSubmit(): void {
    if (!this.provider) {
      return;
    }
    this.providerService.editProvider(this.provider).subscribe(
      response => {
        console.log('Proveedor actualizado:', response);
        this.router.navigate(['/providers']); // Navegar a la lista de proveedores después de la actualización
      },
      error => {
        console.error('Error al actualizar el proveedor:', error);
      }
    );
  }
}
