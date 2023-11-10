import { EventEmitter, Injectable, Output } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { IfireBseProduct } from '../Models/ifire-base-prd';

@Injectable({
  providedIn: 'root'
})
export class FirebasePrdService {
  products: IfireBseProduct[] = [];
  onFilterChange: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fsObject: Firestore) { }
  getProducts() {
    let products = collection(this.fsObject, 'products');
    return collectionData(products, { idField: 'id' });
  }

  addProduct(product: IfireBseProduct) {
    addDoc(collection(this.fsObject, 'products'), product);
  }

  //////////////////////////////////////////////////////////////

  filterProducts(value: string): void {
    this.getProducts().subscribe({
      next: (data) => {
        data;
        this.onFilterChange.emit();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  PerformSearch(val: string): IfireBseProduct[] {
    val = val.toLowerCase();
    return this.products.filter(product => product.title.toLowerCase().includes(val));
  }
}

