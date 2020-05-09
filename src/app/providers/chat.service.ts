import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Mensaje} from '../interface/mensaje.interface';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats:Mensaje[]=[];
  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
    return this.itemsCollection.valueChanges().pipe(
                                                map((mensajes:Mensaje[])=>{
                                                  console.log(mensajes);
                                                  this.chats=mensajes;
                                                })
    );
                              
  }
  agregarMensaje(texto:string){
    //Falta el UID del usuario
    let mensaje:Mensaje={
      nombre:'Demo',
      mensaje:texto,
      fecha:new Date().getTime()
    }
    return this.itemsCollection.add(mensaje);//para hacer la inserccion de un nuevo mensaje en firebase
    //esto me devuelve una promesaa
  }
}
