import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../providers/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  mensaje:string='';
  elemento:any;
  constructor(public _cs:ChatService) {
    this._cs.cargarMensajes().subscribe(()=>{
      setTimeout(() => {
        this.elemento.scrollTop=this.elemento.scrollHeight; //es qpara que el puntro se vaya siempre
                                                            //hasta el ultimo mensaje creado
      }, 20);
    });
   }

  

  ngOnInit() {
    //tengo la referencia al objeto html
    this.elemento=document.getElementById('app-mensajes');
  }
  enviar_mensaje(){
    console.log(this.mensaje);
    if (this.mensaje.length===0){
      return;
    }
    this._cs.agregarMensaje(this.mensaje)
            .then(()=>{
              console.log('Mensaje Enviado'); 
              this.mensaje="";
              //la funcion agregarMensaje devuelve una promesa por eso puedo utilizar el then y catch
            })
            .catch((err)=>{
              console.error('error al enviar',err);
            })
  }

}
