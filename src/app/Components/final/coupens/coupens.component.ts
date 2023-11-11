import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IfirebaseUsers } from 'src/app/Models/ifirebase-users';
import { FirebasePrdService } from 'src/app/Services/fire-base-prd.service';

@Component({
  selector: 'app-coupens',
  templateUrl: './coupens.component.html',
  styleUrls: ['./coupens.component.css'],
})
export class CoupensComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['_id', 'createdAt', 'email', 'name'];
  dataSource: MatTableDataSource<IfirebaseUsers> = new MatTableDataSource<IfirebaseUsers>([]);
  clickedRows = new Set<IfirebaseUsers>();
  date = new Date();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private firebasePrdService: FirebasePrdService) {}

  ngOnInit(): void {
    this.firebasePrdService.getUsers().subscribe({
      next: (users: (DocumentData | (DocumentData & { id: string; }))[]) => {
        const mappedUsers: IfirebaseUsers[] = users.map((userData) => {
          if ('id' in userData) {
            const { id, ...rest } = userData;
            // console.log(userData);

            return { _id: id, ...rest } as IfirebaseUsers;
          }
          return userData as IfirebaseUsers;
        });

        // console.log('Mapped Users:', mappedUsers);

        this.dataSource.data = mappedUsers;
      },
      error: (err) => {
        console.log('Error fetching users:', err);
      },
      complete: () => {
        console.log('User fetching completed.');
      },
    });
  }


  onRowClick(row: IfirebaseUsers): void {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.add(row);
    }
  }

  isRowClicked(row: IfirebaseUsers): boolean {
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
}
