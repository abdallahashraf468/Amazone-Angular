import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { IfireBseProduct } from '../Models/ifire-base-prd';

@Injectable({
  providedIn: 'root'
})
export class FirebasePrdService {
  products: IfireBseProduct[] = [];
  onFilterChange: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fsObject: Firestore) { }
  getProducts() {
    const products = collection(this.fsObject, 'products');
    return collectionData(products, { idField: 'id' });
  }
  getProductById(id: string) {
    const product = doc(this.fsObject, 'products', id);
    console.log(product);
    
    return getDoc(product);
  }
  

  addProduct(product: IfireBseProduct) {
    return addDoc(collection(this.fsObject, 'products'), product);
  }

  updateProduct(product: IfireBseProduct) {
    const productObject = { ...product };
    const prdRef = doc(this.fsObject, 'products', product._id);
    alert("Product Updated Successfully");
    return updateDoc(prdRef, productObject);
  }
  async deleteProduct(_id: string) {
    const prdRef = doc(this.fsObject, 'products', _id);
  
    try {
      await deleteDoc(prdRef);
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error; // Re-throw the error to propagate it further if needed
    }
  }
  
  

  getBrands() {
    const brands = collection(this.fsObject, 'brands');
    return collectionData(brands, { idField: 'id' });
  }

  getCtaegories() {
    const categories = collection(this.fsObject, 'categories');
    return collectionData(categories, { idField: 'id' });
  }

  getSubCategories() {
    const subCategories = collection(this.fsObject, 'sub-categories');
    return collectionData(subCategories, { idField: 'id' });
  }

  getOrders() {
    const order = collection(this.fsObject, 'orders');
    return collectionData(order, { idField: 'id' });
  }

  getUsers() {
    const users = collection(this.fsObject, 'users');
    return collectionData(users, { idField: 'id' });
  }

  //////////////////////////////////////////////////////////////

  filterProducts(value: string): void {
    this.getProducts().subscribe({
      next: (data: any) => { // Replace 'any' with the actual type of your Firestore document if available
        // Map Firestore documents to IfireBseProduct interface
        this.products = data.map((documentData: any) => {
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
          } as IfireBseProduct;
        });
  
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