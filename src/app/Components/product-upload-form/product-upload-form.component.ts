import { Component, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { IfireBseProduct } from 'src/app/Models/ifire-base-prd';
import { FirebasePrdService } from 'src/app/Services/fire-base-prd.service';

@Component({
  selector: 'app-product-upload-form',
  templateUrl: './product-upload-form.component.html',
  styleUrls: ['./product-upload-form.component.css']
})
export class ProductUploadFormComponent {
  prdToAdd: IfireBseProduct = {} as IfireBseProduct;
  prds:IfireBseProduct[]=[];
  coverImageFileName: string = '';
  prodductImageFileName: string = '';

  
  private readonly storage: Storage = inject(Storage);
  constructor(private fireBase:FirebasePrdService, private router: Router ) { 
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
  ngOnInit(): void {
    this.getProducts();
  }
  
  uploadFile(input: HTMLInputElement) {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        uploadBytesResumable(storageRef, file);
      }
    }
  }
}
