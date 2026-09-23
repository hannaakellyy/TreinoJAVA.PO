import java.util.*;

class CalculadoraGeometrica{

  public static int calcularAreaQuadrado(int lado){
    return lado * lado;
  }
}

public class Main{
  public static void main (String [] args){
    System.out.println("testando");
      
     int resultado = CalculadoraGeometrica.calcularAreaQuadrado(20);

System.out.print(" a area do quadrado é " + resultado);
  }
}
