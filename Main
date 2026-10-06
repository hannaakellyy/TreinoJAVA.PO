import java.util.*;

abstract class Funcionario{
  protected String nome;
  protected double salario;

  Funcionario(String nome, double salario){
    this.nome = nome;
    this.salario = salario;
  }


}

  class Gerente extends Funcionario{
    private double bonus;

    Gerente(String nome, double salario, double bonus){
      super(nome,salario);
      this.bonus = bonus;
    }

    void setbonus(double bonus){
      this.bonus = bonus;
    }

    double getbonus(){
      return this.bonus;
    }

    public void calcularSalarioTotal(){

    double total = 0;

    total = salario + bonus;

    System.out.print("total do salario:" + total);
  }
  }


public class Main {
    public static void main(String[] args) {
      System.out.println("Hello, World!");

      Gerente gerente1 = new Gerente("Hanna", 3000, 200);

      gerente1.calcularSalarioTotal();


    }
}
