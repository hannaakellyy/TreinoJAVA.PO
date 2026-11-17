import java.util.*;

class Motorista{
  String nome;
  String CPF;
  Carro carro;

  Motorista(String nome, String CPF){
    this.nome = nome;
    this.CPF = CPF;
  }

  void atribuirCarro( Carro carro){

    if( carro.obterMotorista() != null){
      System.err.print("cheio");
    }
     else{
       
       this.carro = carro;
     }

  }
}

  class Carro{
    int placa;
    String modelo;
    int referencia;
    Motorista motorista;

    Carro(int placa, String modelo, int referencia){
      this.placa = placa;
      this.modelo = modelo;
      this.referencia = referencia;
    }

    Motorista obterMotorista(){
      return this.motorista;
    }
    void atribuirMotorista(Motorista motorista){
      this.motorista = motorista;
    }
      
    }
  


public class Main {
    public static void main(String[] args) {
      System.out.println("Hello, World!");

      Motorista motorista1 = new Motorista("Fabio", "06097233329");
       
      
      Carro carro1 = new Carro(123, "novo", 20);
      carro1.atribuirMotorista(motorista1);
      
      

      System.out.print("Motorista do carro:" + carro1.obterMotorista().nome);
    }
}