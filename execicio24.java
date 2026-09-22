import java.util.*;


abstract class Personagem{
  String nome;
  int nivel;
  
  void exibirStatus(){
    System.out.print("o nome do personagem é:" + nome + "o nivel do personegem é" + nivel );
  }

}

class Guerreiro extends Personagem{
  int forcaAtaque;

  void atacarComEspada(){

  System.out.print("desferiu um golpe de espada usando a força de ataque");

  }
}

class Mago extends Personagem{
  int mana;
  
  void lancarMagia(){
    System.out.print("lançou um feitiço gastando mana");
  }
}

public class Main{
  public static void main (String[]args){
    System.out.print("testando");

Guerreiro personagem1 = new Guerreiro();

personagem1.atacarComEspada();

  }
}