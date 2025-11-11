import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface AddUserDto {
name: string;
user: string; // username or NT
role: string;
region: string;
}


@Component({
selector: 'app-add-user-modal',
templateUrl: './add-user-modal.component.html',
styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {
@Input() visible = false; // control from parent
@Input() roles: string[] = ['Admin', 'Editor', 'Viewer'];
@Input() regions: string[] = ['North', 'South', 'East', 'West'];
@Output() close = new EventEmitter<void>();
@Output() save = new EventEmitter<AddUserDto>();


form!: FormGroup;


constructor(private fb: FormBuilder) {}


ngOnInit(): void {
this.form = this.fb.group({
name: ['', [Validators.required, Validators.maxLength(100)]],
user: ['', [Validators.required, Validators.maxLength(50)]],
role: ['', Validators.required],
region: ['', Validators.required]
});
}


onCancel() {
this.form.reset();
this.close.emit();
}


onSubmit() {
if (this.form.invalid) {
this.form.markAllAsTouched();
return;
}


const payload: AddUserDto = this.form.value;
this.save.emit(payload);
this.form.reset();
this.close.emit();
}
}