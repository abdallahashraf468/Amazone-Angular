import { FirebasePrdService } from 'src/app/Services/fire-base-prd.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.css']
})
export class UpdateProductFormComponent {
  brands:any[]=[];
  constructor(private firebase:FirebasePrdService) { }
  getBrands(){
    this.firebase.getBrands().subscribe({
      next: (data) => {
        console.log(data);
        
        this.brands = data.map((documentData: any) => {
          return {
            name: documentData.name,
            slug: documentData.slug,
            image: documentData.image,
            _id: documentData._id
          };
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
