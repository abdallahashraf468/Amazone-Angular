import { Component, EventEmitter, Input, OnInit, Output ,inject} from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { Store } from 'src/app/Models/store';
import { ProductsService } from 'src/app/Services/products.service';
import { ProductsApiService } from './../../Services/products-api.service';
import { FirebasePrdService } from 'src/app/Services/fire-base-prd.service';
import { IfireBseProduct } from 'src/app/Models/ifire-base-prd';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],

})
export class ProductsComponent implements OnInit {
  
  private readonly storage: Storage = inject(Storage);
  store: Store = new Store("Products", ["tables", "chairs", "tv"], "assets/img/logo2.png");
  selectedCategory: number = 0;
  date = new Date();
  prds:IfireBseProduct[]=[];
  prdToAdd: IfireBseProduct = {} as IfireBseProduct;
  coverImageFileName: string = '';
  prodductImageFileName: string = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.prds);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    // Call filterProducts to update the data based on the filter value
    this.fireBase.filterProducts(filterValue);
  }
  
  //////////////////////////////////////

  constructor(private prdService: ProductsService, private router: Router, private productsApiService: ProductsApiService,
    private fireBase:FirebasePrdService) {
      this.fireBase.onFilterChange.subscribe(() => {
        this.getProducts();
      });


      this.prdToAdd = {
        brand: {
          name: '',
          slug: '',
          image: '',
          _id: ''
        },
        category: {
          slug: '',
          name: '',
          image: '',
          _id: ''
        },
        createdAt: '',
        description: '',
        id: '',
        imageCover: '',
        images: [],
        price: 0,
        priceAfterDiscount: 0,
        quantity: 0,
        ratingsAverage: 0,
        ratingsQuantity: 0,
        slug: '',
        sold: 0,
        subcategory: [],
        title: '',
        updatedAt: '',
        _id: ''
      };
  }

  getProducts(){
    this.fireBase.getProducts().subscribe({
      next: (data) => {
        console.log(data);
        // Map Firestore documents to IfireBseProduct interface
        this.prds = data.map((documentData: any) => {
          return {
            brand: documentData.brand,
            category: documentData.category,
            createdAt: documentData.createdAt,
            description: documentData.description,
            id: documentData.id,
            imageCover: documentData.imageCover,
            images: documentData.images,
            price: documentData.price,
            priceAfterDiscount: documentData.priceAfterDiscount,
            quantity: documentData.quantity,
            ratingsAverage: documentData.ratingsAverage,
            ratingsQuantity: documentData.ratingsQuantity,
            slug: documentData.slug,
            sold: documentData.sold,
            subcategory: documentData.subcategory,
            title: documentData.title,
            updatedAt: documentData.updatedAt,
            _id: documentData._id
          };
        });
        this.dataSource = new MatTableDataSource(this.prds);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  addProduct(){
    this.fireBase.addProduct(this.prdToAdd);
    this.getProducts();
  }

//   onImageCoverSelected(event: any) {
//     if (!event.files) return

//     const files: FileList = event.files;

//     for (let i = 0; i < files.length; i++) {
//         const file = files.item(i);
//         if (file) {
//             const storageRef = ref(this.storage, file.name);
//             uploadBytesResumable(storageRef, file);
//         }
//     }
// }

  // onImageCoverSelected(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files?.length) {
  //     this.coverImageFileName = inputElement.files[0].name;
  //   }
  // }

  onImagesSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      this.prodductImageFileName = inputElement.files[0].name;
    }
  }


  ngOnInit(): void {
    this.getProducts();
  }







  


}
