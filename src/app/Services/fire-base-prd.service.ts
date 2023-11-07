import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs } from '@angular/fire/firestore';
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
}