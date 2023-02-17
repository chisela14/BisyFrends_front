import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/interfaces/group.interface';
import { GroupService } from '../../../group/services/group.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit {


  //para probar el select
  groups: Group[] = this.groupService.getGroups();

  constructor(private fb:FormBuilder, private groupService:GroupService) { }

  addEvForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    info: [''],
    duration: [null, [Validators.required, Validators.min(0.1)]],
    attendance: [null, [Validators.required, Validators.min(0)]],
    date: [null, [this.dateValidator]],
    group: ['', [Validators.required]]
  })

  dateValidator(control: FormControl): { [s: string]: boolean} | null  {
    if (control.value) {
      const date = new Date(control.value);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (date<today) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }

  ngOnInit(): void {
  }

  isNotValid(field:string){
    return this.addEvForm.controls[field].invalid && this.addEvForm.controls[field].touched;
    //return this.addEvForm.controls[field].errors && this.addEvForm.controls[field].touched;
  }

  save(){
    console.log("enviado")
  }

}
