import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { Store } from 'src/app/Models/store';
import { ProductsService } from 'src/app/Services/products.service';
import { ProductsApiService } from './../../Services/products-api.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  store: Store = new Store("Products", ["tables", "chairs", "tv"], "assets/img/logo2.png");
  ClientName: string;
  // ProductsList: Iproduct[];
  selectedCategory: number = 0;
  filterProductsList: Iproduct[] = [];
  date = new Date();

  constructor(private prdService: ProductsService, private router: Router, private productsApiService: ProductsApiService) {
    this.ClientName = "Muhammad Omar";
    this.productsApiService.getAllProducts().subscribe({
      next: (data) => {
        this.filterProductsList = data;
        // console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
    // this.onaddNewPrd = new EventEmitter<Iproduct>();
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // this.ProductsList = [
    //   { id: 2, name: "Anders Glass Top Coffee Table", price: 11200, quantity: 0, categoryID: 1, Material: "Glass", PrdimgURL: "https://media.homecentre.com/i/homecentre/165097472-165097472-HC21122022_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp-2x$", count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    //   { id: 5, name: 'Trixia 4-Seater Glass Top Table', price: 30000, quantity: 8, PrdimgURL: 'https://media.homecentre.com/i/homecentre/163645951-163645951-HC07102021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$', categoryID: 1, Material: 'Metal', count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    //   { id: 25, name: 'Gasha Marble Top Side Table', price: 14000, quantity: 10, PrdimgURL: 'https://media.homecentre.com/i/homecentre/160079085-160079085-HC020518_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$', categoryID: 1, Material: 'Metal', count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    //   { id: 7, name: 'Ventura Fabric Dining Chair', price: 1500, quantity: 2, PrdimgURL: 'https://media.homecentre.com/i/homecentre/161257427-161257427-HC280119_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$', categoryID: 2, Material: 'Upholstered Seating', count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    //   { id: 17, name: 'Alex Armless Study Chair', price: 2000, quantity: 2, PrdimgURL: 'https://media.homecentre.com/i/homecentre/160540419-160540419-HC020718_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp-2x$', categoryID: 2, Material: 'Fabric', count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    //   { id: 9, name: 'Boston Study Chair', price: 1000, quantity: 10, PrdimgURL: 'https://media.homecentre.com/i/homecentre/159671547-159671547-HCB1226OCT17_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$', categoryID: 2, Material: 'Upholstered Seating', count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    //   { id: 10, name: 'Coby Extendable TV Unit', price: 13000, quantity: 0, PrdimgURL: 'https://media.homecentre.com/i/homecentre/163723189-163568026-HC16082021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$', categoryID: 3, Material: 'Wood', count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    //   { id: 15, name: 'Accent TV Unit', price: 36999, quantity: 4, PrdimgURL: 'https://media.homecentre.com/i/homecentre/161684469-161684469-HC210519_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$', categoryID: 3, Material: 'MDF', count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    //   { id: 55, name: 'Plymouth TV Unit', price: 36999, quantity: 3, PrdimgURL: 'https://media.homecentre.com/i/homecentre/163688823-163688823-HC05102021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$', categoryID: 3, Material: 'wood', count: 0, details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam fugit autem error, inventore exercitationem quidem. Minus, dolores quod architecto, esse omnis numquam maxime sapiente deleniti provident natus illo, est iste?" },
    // ]
  }

  ngOnInit(): void {
    this.filterProductsList = this.prdService.ProductsList;
  }

  //cart
  isQuantityZero(product: Iproduct): boolean {
    return product.quantity == 0;
  }
  handleCart(product: Iproduct) {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }
  addToCart(value: Iproduct) {
    console.log(value);
    this.onaddNewPrd.emit(value);
  }

  @Output() onaddNewPrd: EventEmitter<Iproduct> = new EventEmitter<Iproduct>();

  //select
  optionList = ["1", "2", "3"]
  filterPrds() {
    if (this.selectedCategory == 0) {
      this.filterProductsList = this.prdService.ProductsList;
    } else {
      this.filterProductsList = this.prdService.ProductsList.filter(prd => prd.categoryID == this.selectedCategory);
    }
  }
  // search by name
  @Input() set filterName(name: string) {
    // console.log(name);
    // this.filterProductsList = this.performSearch(name);
    // console.log(this.filterProductsList);
    this.filterProductsList = this.prdService.performSearch(name)
  }
  // performSearch(filterName: string): Iproduct[] {
  //   filterName = filterName.toLowerCase();
  //   return this.prdService.ProductsList.filter((prd: Iproduct) => prd.name.toLowerCase().includes(filterName));
  // }

  // search by price
  @Input() set listFilter(value: number) {
    this.filterProductsList = this.performFilter(value);
    //  console.log(this.productsListFilter);
  }
  performFilter(filterValue: number): Iproduct[] {
    console.log('FilterValue:', filterValue);
    const filteredProducts = this.prdService.ProductsList.filter((prd: Iproduct) => prd.price >= filterValue);
    console.log('Filtered Products:', filteredProducts);
    return filteredProducts;
  }


  prdDetails(prdID: number) {
    this.router.navigate(['/details', prdID]);
  }



}
