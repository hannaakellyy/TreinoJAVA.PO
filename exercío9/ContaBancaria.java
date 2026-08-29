
public class ContaBancaria {
    // 1. Atributos privados (Encapsulamento)
    private String titular;
    private double saldo;
    private int numero;

    // 2. O Construtor (que inicializa e exibe a mensagem pedida)
    public ContaBancaria(String titular, double saldo, int numero) {
        this.titular = titular;
        this.saldo = saldo;
        this.numero = numero;
        
        System.out.println("Conta criada para " + this.titular + 
                           " com número " + this.numero + 
                           " e saldo inicial de R$ " + this.saldo);
    }

    // 3. Getters para todos os atributos
    public String getTitular() {
        return titular;
    }

    public double getSaldo() {
        return saldo;
    }

    public int getNumero() {
        return numero;
    }

    // 4. Métodos de Ação (com lógica e validação parecida com o que vimos no set!)
    public void depositar(double valor) {
        if (valor > 0) {
            this.saldo += valor; // Soma o valor ao saldo atual
            System.out.println("Depósito de R$ " + valor + " realizado com sucesso!");
        } else {
            System.out.println("Valor de depósito inválido!");
        }
    }

    public void sacar(double valor) {
        // Validação para garantir que tem dinheiro suficiente na conta
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor; // Tira o valor do saldo
            System.out.println("Saque de R$ " + valor + " realizado com sucesso!");
        } else {
            System.out.println("Saque negado! Saldo insuficiente ou valor inválido.");
        }
    }

    public void exibirSaldo() {
        System.out.println("Saldo atual da conta de " + this.titular + ": R$ " + this.saldo);
    }
}
public class Main {
    public static void main(String[] args) {
        // 1. Criando o objeto usando o Construtor (já exibe a mensagem de criação)
        ContaBancaria minhaConta = new ContaBancaria("Maria", 500.0, 12345);

        // 2. Usando as ações (métodos)
        minhaConta.depositar(200.0); // O saldo vai para 700
        minhaConta.sacar(100.0);     // O saldo volta para 600

        // 3. Exibindo o saldo final usando o método da classe
        minhaConta.exibirSaldo();
        
        // Ou se você quisesse pegar o saldo com o get para usar em alguma conta no main:
        // double quantoTem = minhaConta.getSaldo();
    }
}