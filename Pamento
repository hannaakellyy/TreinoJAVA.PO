import java.util.*;


abstract class Pagamento{

  public static void processarPagamento(){
  System.out.println("processando pagamento");
  }
}

class CartaoCredito extends Pagamento{

}

class Pix{
  public static void processarPagamento(){
    System.out.println("processando o seu pix");
  }
}

public class Main{
  public static void main(String[] args){
    Pagamento cartao1 = new CartaoCredito();

    cartao1.processarPagamento();

    Pix pix1 = new Pix();

    pix1.processarPagamento();

  }
}