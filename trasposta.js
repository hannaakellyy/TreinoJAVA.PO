class Matrix {
  constructor(data) {
    if (Array.isArray(data)) {
      this.data = data;
      this.rows = data.length;
      this.cols = data[0].length;

      // Validação: Garante que todas as linhas têm o mesmo número de colunas
      for (let i = 0; i < this.rows; i++) {
        if (data[i].length !== this.cols) {
          throw new Error("Erro: Todas as linhas da matriz devem ter o mesmo número de colunas.");
        }
      }
    } else {
      this.rows = data;
      this.cols = arguments[1];
      this.data = Array(this.rows).fill(0).map(() => Array(this.cols).fill(0));
    }
  }

  get(i, j) {
    return this.data[i][j];
  }

  set(i, j, value) {
    this.data[i][j] = value;
  }
}

class Vector {
  constructor(data) {
    if (Array.isArray(data)) {
      this.data = data;
      this.dim = data.length;
    } else {
      this.dim = data;
      this.data = Array(this.dim).fill(0);
    }
  }

  get(i) {
    return this.data[i];
  }

  set(i, value) {
    this.data[i] = value;
  }
}

class LinearAlgebra {
  transpose(a) {
    if (a instanceof Matrix) {
      let novaMatriz = new Matrix(a.cols, a.rows);
      for (let i = 0; i < a.rows; i++) {
        for (let j = 0; j < a.cols; j++) {
          novaMatriz.set(j, i, a.get(i, j));
        }
      }
      return novaMatriz;
    } 
    else if (a instanceof Vector) {
      let novoVetor = new Vector(a.dim);
      for (let i = 0; i < a.dim; i++) {
        novoVetor.set(i, a.get(i));
      }
      return novoVetor;
    } 
    else {
      throw new Error("Parâmetro inválido para transpose.");
    }
  }

  sum(a, b) {
    if (a instanceof Matrix && b instanceof Matrix) {
      // Validação matemática: As dimensões devem ser estritamente iguais
      if (a.rows !== b.rows || a.cols !== b.cols) {
        throw new Error("Erro: As matrizes devem ter as mesmas dimensões (linhas e colunas) para serem somadas.");
      }
      let resultado = new Matrix(a.rows, a.cols);
      for (let i = 0; i < a.rows; i++) {
        for (let j = 0; j < a.cols; j++) {
          let soma = a.get(i, j) + b.get(i, j);
          resultado.set(i, j, soma);
        }
      }
      return resultado;
    }

    if (a instanceof Vector && b instanceof Vector) {
      if (a.dim !== b.dim) {
        throw new Error("Erro: Os vetores devem ter a mesma dimensão para serem somados.");
      }
      let resultado = new Vector(a.dim);
      for (let i = 0; i < a.dim; i++) {
        let soma = a.get(i) + b.get(i);
        resultado.set(i, soma);
      }
      return resultado;
    }

    throw new Error("Os parâmetros devem ser dois objetos do tipo Matrix ou dois do tipo Vector.");
  }
}

class Main {
  static executar() {
    const linear1 = new LinearAlgebra();
    console.log("=== TESTANDO MÉTODOS DE ÁLGEBRA LINEAR ===\n");

    // 1. Transposta de Matriz
    const matrizTransposta = linear1.transpose(new Matrix([[1, 2], [3, 4]]));
    console.log("Transposta da Matriz:", matrizTransposta);

    // 2. Transposta de Vetor
    const vetorTransposto = linear1.transpose(new Vector([10, 20, 30]));
    console.log("Transposta do Vetor:", vetorTransposto);

    // 3. Soma de Matrizes (mesmo tamanho)
    const somaMatrizes = linear1.sum(
      new Matrix([[1, 2], [3, 4]]),
      new Matrix([[5, 6], [7, 8]])
    );
    console.log("Soma das Matrizes:", somaMatrizes);

    // 4. Soma de Vetores (mesmo tamanho)
    const somaVetores = linear1.sum(
      new Vector([1, 2, 3]),
      new Vector([4, 5, 6])
    );
    console.log("Soma dos Vetores:", somaVetores);
  }
}

// Executa o programa
Main.executar();