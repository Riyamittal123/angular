import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: [data ? data.name : '', Validators.required],
      phone: [data ? data.phone : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [data ? data.email : '', [Validators.required, Validators.email]]
    });
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get phone() {
    return this.employeeForm.get('phone');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.dialogRef.close();
  }
}
