import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metodo-simplex',
  templateUrl: './metodo-simplex.component.html',
  styles: []
})
export class MetodoSimplexComponent implements OnInit {

  constructor() { }

  operacion : boolean = true; //TRUE = Maximizar; FALSE = Minimizar;

  variables_botones : any[] = []; 

  restricciones_filas : any[] = []; 

  estado : boolean = false;

  ngOnInit() {
    //this.cargarArreglo();
  }

  cambiar_operacion(valor){
    if(valor == 'Maximizar'){
      this.operacion = true;
    }else{
      this.operacion = false;
    }
  }

  crear_variables(cantidad){
    let boton : any;

    for (let i = 1; i <= cantidad; i++) {
      boton = {etiqueta: "x "+i, columna: i};

      this.variables_botones.push(boton);
    }

  }

  crear_restricciones(cantidad){
    let boton : any;

    for (let i = 1; i <= cantidad; i++) {
      boton = {fila: i};

      this.restricciones_filas.push(boton);
    }
    this.estado = true;
  }










  /*
  for (let i = 1; i <= cantidad; i++) {
    for (let j = 1; j <= this.variables_botones.length; j++) {
      boton = {posicion: i+"-"+j, valor: j};

      this.restricciones_filas.push(boton);
    }
  }
  */
}
