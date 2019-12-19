import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metodo-simplex',
  templateUrl: './metodo-simplex.component.html',
  styles: []
})
export class MetodoSimplexComponent implements OnInit {

  constructor() { }

  operacion : boolean = true; //TRUE = Maximizar; FALSE = Minimizar;

  cantidad_variables : number;

  cantidad_restricciones : number;

  arreglo_variables : any[] = [];

  variables_botones : any[] = []; 

  restricciones_filas : any[] = []; 

  variables_columnas : any[] = [];

  estado : boolean = false;

  iniciar : boolean = false;

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

    this.cantidad_variables = cantidad;
  }

  crear_restricciones(cantidad){
    let boton : any;

    for (let i = 1; i <= cantidad; i++) {
      boton = {fila: i};

      this.restricciones_filas.push(boton);
    }
    this.estado = true;

    this.cantidad_restricciones = cantidad;
  }

  empezar(){
    //let num : number = parseFloat((<HTMLInputElement>document.getElementById("x1")).value);

    let aux : any;

    let comparador : number = +(this.cantidad_restricciones) + 1;

    let posicion_resultado = +(this.cantidad_restricciones) +(comparador);

    let boton : any;

    for (let i = 1; i <= posicion_resultado; i++) {
      if(i < posicion_resultado){
        boton = {etiqueta: "x "+i, columna: i};
      }else{
        boton = {etiqueta: "R", columna: i};
      }
      

      this.variables_columnas.push(boton);
    }
    
    let fila_1 : any[] = [];
    let fila_2 : any[] = [];
    let fila_3 : any[] = [];
    let fila_4 : any[] = [];
    let fila_5 : any[] = [];
    
    //Variables colocadas en un arreglo con posiciones

    for (let i = 1; i <= this.cantidad_variables; i++) {
      if(comparador > 1){aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('1-'+i)).value), posicion: '1-'+i}; fila_1.push(aux)}
      if(comparador > 2){aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('2-'+i)).value), posicion: '2-'+i}; fila_2.push(aux)}
      if(comparador > 3){aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('3-'+i)).value), posicion: '3-'+i}; fila_3.push(aux)}
      if(comparador > 4){aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('4-'+i)).value), posicion: '4-'+i}; fila_4.push(aux)}
      aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('x'+i)).value), posicion: '5-'+i}; fila_5.push(aux);
    }

    //Variables de Olgura

    for (let i = 0; i < this.cantidad_restricciones; i++) {
      if(i == 0){aux = {valor: 1, posicion: '1-'+(+comparador+i)}; fila_1.push(aux);
                aux = {valor: 0, posicion: '2-'+(+comparador+i)}; fila_2.push(aux);
                aux = {valor: 0, posicion: '3-'+(+comparador+i)}; fila_3.push(aux);
                aux = {valor: 0, posicion: '4-'+(+comparador+i)}; fila_4.push(aux);
                aux = {valor: 0, posicion: '5-'+(+comparador+i)}; fila_5.push(aux);}
      if(i == 1){aux = {valor: 1, posicion: '2-'+(+comparador+i)}; fila_2.push(aux);
                aux = {valor: 0, posicion: '1-'+(+comparador+i)}; fila_1.push(aux);
                aux = {valor: 0, posicion: '3-'+(+comparador+i)}; fila_3.push(aux);
                aux = {valor: 0, posicion: '4-'+(+comparador+i)}; fila_4.push(aux);
                aux = {valor: 0, posicion: '5-'+(+comparador+i)}; fila_5.push(aux);}
      if(i == 2){aux = {valor: 1, posicion: '3-'+(+comparador+i)}; fila_3.push(aux);
                aux = {valor: 0, posicion: '1-'+(+comparador+i)}; fila_1.push(aux);
                aux = {valor: 0, posicion: '2-'+(+comparador+i)}; fila_2.push(aux);
                aux = {valor: 0, posicion: '4-'+(+comparador+i)}; fila_4.push(aux);
                aux = {valor: 0, posicion: '5-'+(+comparador+i)}; fila_5.push(aux);}
      if(i == 3){aux = {valor: 1, posicion: '4-'+(+comparador+i)}; fila_4.push(aux);
                aux = {valor: 0, posicion: '1-'+(+comparador+i)}; fila_1.push(aux);
                aux = {valor: 0, posicion: '2-'+(+comparador+i)}; fila_2.push(aux);
                aux = {valor: 0, posicion: '3-'+(+comparador+i)}; fila_3.push(aux);
                aux = {valor: 0, posicion: '5-'+(+comparador+i)}; fila_5.push(aux);}
    }

    //Variables de resultado añadidas

    if(comparador > 1){aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('1-r')).value), posicion: '1-r'}; fila_1.push(aux)}
    if(comparador > 2){aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('2-r')).value), posicion: '2-r'}; fila_2.push(aux)}
    if(comparador > 3){aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('3-r')).value), posicion: '3-r'}; fila_3.push(aux)}
    if(comparador > 4){aux = {valor: parseFloat((<HTMLInputElement>document.getElementById('4-r')).value), posicion: '4-r'}; fila_4.push(aux)}
    aux = {valor: 0, posicion: '5-r'}; fila_5.push(aux);

    //Agregar al arreglo

    if(comparador > 1){aux = {variable: 1, fila: fila_1}; this.arreglo_variables.push(aux)}
    if(comparador > 2){aux = {variable: 2, fila: fila_2}; this.arreglo_variables.push(aux)}
    if(comparador > 3){aux = {variable: 3, fila: fila_3}; this.arreglo_variables.push(aux)}
    if(comparador > 4){aux = {variable: 4, fila: fila_4}; this.arreglo_variables.push(aux)}
    aux = {variable: 5, fila: fila_5}; this.arreglo_variables.push(aux);



    
    console.log(this.arreglo_variables);

    this.iniciar = true;


    
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
