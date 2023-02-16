import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Event } from 'src/app/interfaces/event.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html'
})
export class UpdateEventComponent implements OnInit {

  ngOnInit(): void {
  }
  //recuperar evento de la ruta
  constructor(private fb:FormBuilder, private route: ActivatedRoute) { }

   //para probar el select
   groups: string[] = ["daw", "fotografía"];

  testEvent: Event = {
    id: 1,
    name: 'Cena',
    info: 'En el bar Manolo',
    duration: 2,
    attendance: 100,
    date: new Date('2023-02-17'),
    group: {
      name: 'daw', 
      description: 'desarrollo de aplicaciones web', 
      participants: [{username: 'ioliasa', picture: ''}]
    }
  };

  updateEvForm: FormGroup = this.fb.group({
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

  isNotValid(field:string){
    return this.updateEvForm.controls[field].invalid && this.updateEvForm.controls[field].touched;
    //return this.addEvForm.controls[field].errors && this.addEvForm.controls[field].touched;
  }

  save(){
    console.log('Enviado')
  }

}
