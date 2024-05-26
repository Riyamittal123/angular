import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  contacts: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadContacts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openDialog(contact: any = null) {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: contact
    });

    dialogRef.componentInstance.save.subscribe((formData: any) => {
      if (contact) {
        const index = this.contacts.findIndex(c => c === contact);
        this.contacts[index] = formData;
      } else {
        this.contacts.push(formData);
      }
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
      this.loadContacts();
      this.openSnackBar(contact ? 'Contact updated successfully' : 'Contact added successfully');
    });

    dialogRef.componentInstance.cancel.subscribe(() => {
      dialogRef.close();
    });
  }

  editContact(contact: any) {
    this.openDialog(contact);
  }

  loadContacts() {
    try {
      const contacts = JSON.parse(localStorage.getItem('contacts') ?? '[]');
      this.dataSource.data = contacts;
      this.contacts = contacts;
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  }

  deleteContact(contact: any) {
    if (confirm('Are you sure you want to delete this contact?')) {
      const index = this.contacts.findIndex(c => c === contact);
      if (index !== -1) {
        this.contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        this.loadContacts();
        this.openSnackBar('Contact deleted successfully');
      }
    }
  }
}
