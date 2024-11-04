import { Component } from '@angular/core';
import { TableModule, UtilitiesModule,PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    TableModule,
    UtilitiesModule,
    PageItemDirective, PageLinkDirective, PaginationComponent,
    RouterLink
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {

}
