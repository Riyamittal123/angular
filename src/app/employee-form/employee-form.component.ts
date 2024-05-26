import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() contact: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [this.contact?.name || '', Validators.required],
      phone: [this.contact?.phone || '', Validators.required],
      email: [this.contact?.email || '', [Validators.required, Validators.email]]
    });
  }

  get name() {
    return this.employeeForm.get('name')!;
  }

  get phone() {
    return this.employeeForm.get('phone')!;
  }

  get email() {
    return this.employeeForm.get('email')!;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value);
      this.employeeForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
 
