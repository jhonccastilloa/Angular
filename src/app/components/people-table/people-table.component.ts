import { PeopleService } from './../../services/people.service';
import { people } from './../../data/people.data';
import { Person } from './../../models/people.models';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
})
export class PeopleTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'favorite',
    'id',
    'name',
    'category',
    'company',
    'levelOfHappiness',
  ];
  dataSource!: MatTableDataSource<Person>;
  @Input() isDataFavorite: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(
      this.isDataFavorite
        ? this.peopleService.favoritePeople
        : this.peopleService.newPeople
    );
    if (this.isDataFavorite) {
      this.displayedColumns = [
        'id',
        'name',
        'category',
        'company',
        'levelOfHappiness',
        'trash',
      ];
    }
  }

  handleFavorite(person: Person) {
    this.peopleService.addFavorite(person);
  }
  handleRemoveFavorite(person: Person) {
    this.dataSource.data = this.peopleService.removeFavorite(person);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
