import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario:any={};

  constructor(private afs: AngularFirestore,
    public auth: AngularFireAuth) { 

      this.auth.authState.subscribe(user=>{
        console.log('Estado del usuario:',user);
        if(!user){
          return;
        }
        this.usuario.nombre=user.displayName;
        this.usuario.uid=user.uid;
      });
    }

  login(proveedor:string) {
    if(proveedor==='google'){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    else{
      this.auth.signInWithPopup(new auth.GithubAuthProvider());
    }
   
  }
  logout() {
    this.usuario={};
    this.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
          //unshift es para poner el elemento siempre en 
          //la primera posicion
        }
        return this.chats;
      })
    );

  }
  agregarMensaje(texto: string) {
    //Falta el UID del usuario
    let mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }
    return this.itemsCollection.add(mensaje);//para hacer la inserccion de un nuevo mensaje en firebase
    //esto me devuelve una promesaa
  }
}
