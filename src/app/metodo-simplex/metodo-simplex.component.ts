import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metodo-simplex',
  templateUrl: './metodo-simplex.component.html',
  styles: []
})
export class MetodoSimplexComponent implements OnInit {

  constructor() { }

  operacion : boolean = false; //TRUE = Maximizar; FALSE = Minimizar;

  cantidad_variables : number;
  cantidad_restricciones : number;

  arreglo_coeficientes_copia : any[] = [];
  arreglo_coeficientes : any[] = [];

  variables_botones : any[] = []; 
  restricciones_filas : any[] = []; 
  variables_columnas : any[] = [];

  estado : boolean = false;
  iniciar : boolean = false;
  iteraciones : boolean = false;

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

    let posicion_resultado = Number(this.cantidad_variables) + Number(this.cantidad_restricciones) + 1;

    let boton : any;

    for (let i = 1; i <= posicion_resultado; i++) {
      if(i < posicion_resultado){
        boton = {etiqueta: "x"+i, columna: i};
      }else{
        boton = {etiqueta: "R", columna: i};
      }
      

      this.variables_columnas.push(boton);
    }

    
    //Variables colocadas en un arreglo con posiciones

    for (let i = 1; i <= this.cantidad_restricciones; i++) {
      let aux : any[] = [];
      for (let j = 1; j <= this.cantidad_variables; j++) {
        aux[j-1] = parseFloat((<HTMLInputElement>document.getElementById(i+'-'+j)).value);
      }
      this.arreglo_coeficientes.push(aux);
    }

    //Variables de Olgura
    
    let posicion_aux = 1;

    this.arreglo_coeficientes.forEach(element => {
      for (let i = 1; i <= this.cantidad_restricciones; i++) {
        if(i == posicion_aux){
          element.push(1);
        }else{
          element.push(0);
        }
      }
      posicion_aux++;
    });

    //Variables de resultado añadidas

    posicion_aux = 1;

    this.arreglo_coeficientes.forEach(element => {
      element.push(parseFloat((<HTMLInputElement>document.getElementById(posicion_aux+'-r')).value));
      posicion_aux++;
    });

    //Agregar funcion objetivo al arreglo

    let arreglo_aux : any[] = [];
    posicion_aux = 0;

    this.variables_columnas.forEach(element => {
      if(posicion_aux < this.cantidad_variables){
        if(this.operacion){
          arreglo_aux[posicion_aux] = -(parseFloat((<HTMLInputElement>document.getElementById(element.etiqueta)).value));
        }else{
          arreglo_aux[posicion_aux] = parseFloat((<HTMLInputElement>document.getElementById(element.etiqueta)).value);
        }
      }else{
        arreglo_aux[posicion_aux] = 0;
      }
      posicion_aux++;
    });

    this.arreglo_coeficientes.push(arreglo_aux);

    this.arreglo_coeficientes_copia = this.arreglo_coeficientes.concat();

    this.arreglo_coeficientes_copia.push([0]);

    this.iniciar = true;

    /*
    this.arreglo_coeficientes = [[8, -2, 1, -1, 1, 0, 0, 50], [3, 5, 0, 2, 0, 1, 0, 150],
                                  [1, -1, 2, -4, 0, 0, 1, 100], [2, 4, -4, 7, 0, 0, 0, 0]];

    this.cantidad_restricciones = 3;
    this.cantidad_variables = 4;
    */

  }

  iteracion(){
    
    let selector : number = 9999;

    let columna_pivote : number = 0;

    let aux : any = 0;

    let resultado_aux = 9999;

    let pivote : number;

    let fila_pivote : number;

    let indice_fila_objetivo : number = this.arreglo_coeficientes.length - 1;

    let indice_columna_resultado : number = Number(this.cantidad_variables) + Number(this.cantidad_restricciones);

    this.arreglo_coeficientes[indice_fila_objetivo].forEach(element => {
      if(element != 0){if(element < selector){selector = element; columna_pivote = aux;}}
      aux++;
    });

    aux = 0;

    //Encontrar Pivote

    this.arreglo_coeficientes.forEach(element => {

      let operacion_aux : number = 9999;
      let aux_numerador : number = 9999;
      let aux_denominador : number = 1;
      
      if(aux < this.cantidad_restricciones){
        aux_numerador = element[indice_columna_resultado];
        
        if(element[columna_pivote] > 0){aux_denominador = element[columna_pivote];}else{aux_denominador = 1;}
        
        operacion_aux = aux_numerador / aux_denominador;
      }

      if(operacion_aux < resultado_aux){resultado_aux = operacion_aux; pivote = element[columna_pivote]; fila_pivote = aux;};
      
      aux++;
    });

    //Dividir la fila pivote para dejar el pivote en 1

    for (let i = 0; i <= indice_columna_resultado; i++) {
      this.arreglo_coeficientes[fila_pivote][i] = (this.arreglo_coeficientes[fila_pivote][i] / pivote).toFixed(2);
    }

    //Encontrar las otras filas aparte de la fila pivote

    aux = 0;

    this.arreglo_coeficientes.forEach(element => {
      if(aux != fila_pivote){
        let num_pivote = this.arreglo_coeficientes[aux][columna_pivote];
        for (let i = 0; i <= indice_columna_resultado; i++) {
          this.arreglo_coeficientes[aux][i] = (this.arreglo_coeficientes[aux][i] - (num_pivote * this.arreglo_coeficientes[fila_pivote][i])).toFixed(2);
        } 	
      }
      aux++;
    });


    console.log(this.arreglo_coeficientes);

    console.log(this.arreglo_coeficientes_copia);


    this.iteraciones = true;

  }






}
