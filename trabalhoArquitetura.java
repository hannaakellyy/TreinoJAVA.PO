import java.util.*;

class BitsParidade{

  public static void receberDados(){

    Scanner scanner = new Scanner(System.in);

     System.out.println("digite uma sequencia de dados binarios");

     String sequencia = scanner.nextLine();

     for(int i = 0; i < sequencia.length(); i++){
if (sequencia.charAt(i) != '0' && sequencia.charAt(i) != '1'){
  System.err.print("não e um codigo binario");
  return;
}
     }

     System.out.println("voce digitou:" + sequencia);

     scanner.close();

  }

  public static void gerarBitsParidade(String sequencia){
    

  }
}

public class Main {
    public static void main(String[] args) {
      System.out.println("Hello, World!");

      BitsParidade.receberDados();
    }
}