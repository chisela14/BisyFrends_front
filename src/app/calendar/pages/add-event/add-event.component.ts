import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/interfaces/event.interface';
import { Group } from 'src/app/interfaces/group.interface';
import Swal from 'sweetalert2';
import { GroupService } from '../../../group/services/group.service';
import { GroupDto } from '../../../interfaces/group.interface';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit {

  constructor(private fb:FormBuilder, private groupService:GroupService, private eventService:EventService, private router:Router) { }

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

  
  groups!: GroupDto[];

  ngOnInit(): void {
    this.groupService.getGroups()
    .subscribe({
      next:(resp)=>{this.groups=resp},
      error:(err)=>{
        Swal.fire("Fallo al recuperar los grupos de la api")
      }
    })
  }

  isNotValid(field:string){
    return this.addEvForm.controls[field].invalid && this.addEvForm.controls[field].touched;
    //return this.addEvForm.controls[field].errors && this.addEvForm.controls[field].touched;
  }

  //formato de fecha necesario: "finalDate": "04-04-2024 00:00:00"
  save(){
    let date = new Date(this.addEvForm.controls['date'].value)
    let formatDate:string = `${date.getDate()}-${date.getMonth()-1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let event:Event = { id:0, name: this.addEvForm.controls['name'].value, info: this.addEvForm.controls['info'].value,
      duration: this.addEvForm.controls['duration'].value, attendance: this.addEvForm.controls['attendance'].value,
      finalDate: formatDate, group: {id:0}, calendar: [], participation: []};
    let group = this.addEvForm.controls['group'].value;
    console.log(group)
    this.eventService.addEvent(event, group)
    .subscribe({
      next:()=>this.router.navigateByUrl('/schedule'),
      error:()=>{Swal.fire("No se podido añadir el evento")}
    });
  }

}
