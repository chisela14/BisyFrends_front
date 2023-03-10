import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Event } from 'src/app/interfaces/event.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupDto } from '../../../interfaces/group.interface';
import { GroupService } from '../../../group/services/group.service';
import Swal from 'sweetalert2';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html'
})
export class UpdateEventComponent implements OnInit {

  updateEvForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    info: [''],
    duration: [0, [Validators.required, Validators.min(0.1)]],
    attendance: [0, [Validators.required, Validators.min(0)]],
    date: [null, [this.dateValidator]],
    group: [null, [Validators.required]]
  })

  //recuperar evento de la ruta
  constructor(private fb:FormBuilder, private route: ActivatedRoute, private groupService:GroupService, private eventService:EventService, private router:Router) {}
  event!:Event;
  groups!: GroupDto[];
  ngOnInit(): void {
    this.eventService.getEvent(this.route.snapshot.params['event'])
    .subscribe({
      next:(resp)=>{
        this.event=resp
        this.updateEvForm.setValue({ //hay que pasar a todos los campos
          name: this.event.name,
          info: this.event.info,
          duration: this.event.duration,
          attendance: this.event.attendance,
          date: this.event.finalDate,
          group: this.event.group
        })},
      error:(()=>{Swal.fire("No se ha podido recuperar la información del evento")})
    })
    
    this.groupService.getGroups()
    .subscribe({
      next:(resp)=>{this.groups=resp},
      error:(err)=>{
        Swal.fire("Fallo al recuperar los grupos de la api")
      }
    })
    
  }

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

  isNotValid(field:string){
    return this.updateEvForm.controls[field].invalid && this.updateEvForm.controls[field].touched;
    //return this.updateEvForm.controls[field].errors && this.updateEvForm.controls[field].touched;
  }

  save(){
    let date = new Date(this.updateEvForm.controls['date'].value)
    let formatDate:string = `${date.getDate()}-${date.getMonth()-1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let event:Event = { id:this.event.id, name: this.updateEvForm.controls['name'].value, info: this.updateEvForm.controls['info'].value,
      duration: this.updateEvForm.controls['duration'].value, attendance: this.updateEvForm.controls['attendance'].value,
      finalDate: formatDate, group: {id:this.updateEvForm.controls['group'].value}, calendar: [], participation: []};

    this.eventService.updateEvent(event) //la respuesta en la api ha borrado cosas
    .subscribe({
      next:()=>this.router.navigateByUrl('/schedule'),
      error:()=>{Swal.fire("No se podido actualizar el evento")}
    });
  }

}
