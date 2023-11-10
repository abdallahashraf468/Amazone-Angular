import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { IfireBseProduct } from '../Models/ifire-base-prd';

@Injectable({
  providedIn: 'root'
})
export class FirebasePrdService {

  constructor(private fsObject:Firestore) { }
  getProducts(){
    let products = collection(this.fsObject,'products');
    return collectionData(products,{idField:'id'});
  }

  addProduct(product:IfireBseProduct){
    addDoc(collection(this.fsObject,'products'),product);
  }
  updateProduct(product:IfireBseProduct){
    const productObject = { ...product };
    let prdRef = doc(this.fsObject,'products',product.id);
    updateDoc(prdRef,productObject);
  };
  getBrands(){
    let brands = collection(this.fsObject,'brands');
    return collectionData(brands,{idField:'id'});
  }
  getCtaegories(){
    let categories = collection(this.fsObject,'categories');
    return collectionData(categories,{idField:'id'});
  }
  getSubCategories(){
    let subCategories = collection(this.fsObject,'sub-ategories');
    return collectionData(subCategories,{idField:'id'});
  }
  getOrders(){
    let order=collection(this.fsObject,'orders');
    return collectionData(order,{idField:'id'});
  }
  getUsers(){
    let users=collection(this.fsObject,'users');
    return collectionData(users,{idField:'id'});
  }
}