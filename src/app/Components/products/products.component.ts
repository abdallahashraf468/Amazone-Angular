import { Component, EventEmitter, Input, OnInit, Output ,inject, AfterViewInit, ViewChild} from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { FirebasePrdService } from 'src/app/Services/fire-base-prd.service';
import { IfireBseProduct } from 'src/app/Models/ifire-base-prd';
import {MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DocumentData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductFormComponent } from '../update-product-form/update-product-form.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  
  private readonly storage: Storage = inject(Storage);
  displayedColumns: string[] = ['_id','imageCover', 'title', 'price', 'quantity','inStock','update','delete'];
  clickedRows = new Set<IfireBseProduct>();
  dataSource: MatTableDataSource<IfireBseProduct> = new MatTableDataSource<IfireBseProduct>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  date = new Date();
  prds:IfireBseProduct[]=[];
  quantityAvalable:number=0;
  prdToAdd: IfireBseProduct = {} as IfireBseProduct;
  isUpdate:boolean=false;
  coverImageFileName: string = '';
  prodductImageFileName: string = '';
  
  //////////////////////////////////////

  constructor(private router: Router,
    private fireBase:FirebasePrdService,
    private _dialog:MatDialog) {
    
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

  openEditproductForm(){
    this._dialog.open(UpdateProductFormComponent)
  }

  // getProducts(){
  //   this.fireBase.getProducts().subscribe({
  //     next: (products: (DocumentData | (DocumentData & { id: string; }))[]) => {
  //       console.log(products);
  //       // Map Firestore documents to IfireBseProduct interface
  //       this.prds = products.map((productData: any) => {
  //         return {
  //           brand: productData.brand,
  //           category: productData.category,
  //           createdAt: productData.createdAt,
  //           description: productData.description,
  //           id: productData.id,
  //           imageCover: productData.imageCover,
  //           images: productData.images,
  //           price: productData.price,
  //           priceAfterDiscount: productData.priceAfterDiscount,
  //           quantity: productData.quantity,
  //           ratingsAverage: productData.ratingsAverage,
  //           ratingsQuantity: productData.ratingsQuantity,
  //           slug: productData.slug,
  //           sold: productData.sold,
  //           subcategory: productData.subcategory,
  //           title: productData.title,
  //           updatedAt: productData.updatedAt,
  //           _id: productData._id
  //         };
  //       });
  //       this.dataSource = new MatTableDataSource(this.prds);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }
  getProducts(){
    this.fireBase.getProducts().subscribe({
      next: (products: (DocumentData | (DocumentData & { id: string; }))[]) => {
        const mappedProducts:IfireBseProduct[]=products.map((productData)=>{
          if('id' in productData){
            const {id,...rest}=productData;
            
            // console.log(rest['quantity']);
            this.quantityAvalable=rest['quantity'];
            
            // console.log(productData);
            
            return {_id:id,...rest} as IfireBseProduct;
          }
          return productData as IfireBseProduct;
        })
        // console.log('Mapped Products:', mappedProducts);
        
        this.dataSource.data = mappedProducts;
      },
      error: (err) => {
        console.log(err);
        alert(`something went wrong ${err.message}`)
      },
      complete: () => {
        console.log('products fetching completed.');
      },
    });
  }
  onRowClick(row: IfireBseProduct): void {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.add(row);
    }
  }

  isRowClicked(row: IfireBseProduct): boolean {
    return this.clickedRows.has(row);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addProduct(){
    this.fireBase.addProduct(this.prdToAdd);
    this.getProducts();
  }
  // updateProduct(product:IfireBseProduct){
  //   this.isUpdate=!this.isUpdate;
  //   this.fireBase.updateProduct(product);
  //   this.getProducts();
  // }

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
