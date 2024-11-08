import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, UtilitiesModule, PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProviderService } from '../../services/provider.service';
import { Provider } from './../../models/provider.models';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    UtilitiesModule,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    RouterLink,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [ProviderService],
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  providers: Provider[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProviders();
  }

  public getProviders(): void {
    this.providerService.getProviders(this.pageNumber, this.pageSize).subscribe(
      response => {
        console.log(response);
        this.providers = response.items;
        this.totalItems = response.totalItems;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      },
      error => {
        console.error('Error al cargar los proveedores:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1; // Angular Material usa índice basado en 0
    this.getProviders();
  }

  public newProvider(): void {
    this.router.navigate(["new-provider"], { relativeTo: this.route });
  }

  public editProvider(providerId: number): void {
    this.router.navigate([`edit-provider`, providerId], { relativeTo: this.route });
  }
}
