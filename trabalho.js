// ==========================================
// PESSOA 1: Estruturas Base (Matrix & Vector)
// ==========================================

class Matrix {
  constructor(rows, cols, elements) {
    this.rows = rows;
    this.cols = cols;

    if (elements !== undefined && elements !== null) {
      this.elements = elements;
    } else {
      // Caso elementos não sejam informados, inicializa matriz com zeros
      this.elements = Array.from({ length: rows }, () => Array(cols).fill(0));
    }
  }

  get(i, j) {
    if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
      return this.elements[i][j];
    } else {
      throw new Error("Os parâmetros informados excedem os limites da matriz.");
    }
  }

  set(i, j, valor) {
    if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
      this.elements[i][j] = valor;
    } else {
      throw new Error("Os parâmetros informados excedem os limites da matriz.");
    }
  }
}

class Vector {
  constructor(dim, elements) {
    this.dim = dim;

    if (elements !== undefined && elements !== null) {
      this.elements = elements;
    } else {
      this.elements = Array(dim).fill(0);
    }
  }

  get(i) {
    if (i >= 0 && i < this.dim) {
      return this.elements[i];
    } else {
      throw new Error("O índice inserido não é válido para o tamanho do vetor.");
    }
  }

  set(i, valor) {
    if (i >= 0 && i < this.dim) {
      this.elements[i] = valor;
    } else {
      throw new Error("O índice inserido não é válido para o tamanho do vetor.");
    }
  }
}


// ==========================================
// FUNÇÃO AUXILIAR PARA ARREDONDAMENTO
// ==========================================

function arredondar(valor) {
  if (Math.abs(valor) < 1e-10) {
    return 0;
  }

  if (Math.abs(valor - Math.round(valor)) < 1e-10) {
    return Math.round(valor);
  }

  return valor;
}


// ==========================================
// PESSOAS 2, 3, 4 e 5: Classe LinearAlgebra
// ==========================================

class LinearAlgebra {

  // --- PESSOA 2: Operações Elementares ---

  transpose(a) {
    if (a instanceof Matrix) {
      let novaMatriz = new Matrix(a.cols, a.rows);

      for (let i = 0; i < a.rows; i++) {
        for (let j = 0; j < a.cols; j++) {
          novaMatriz.set(j, i, a.get(i, j));
        }
      }

      return novaMatriz;

    } else if (a instanceof Vector) {
      let novoVetor = new Vector(a.dim);

      for (let i = 0; i < a.dim; i++) {
        novoVetor.set(i, a.get(i));
      }

      return novoVetor;

    } else {
      throw new Error("Parâmetro inválido para transpose.");
    }
  }


  sum(a, b) {
    if (a instanceof Matrix && b instanceof Matrix) {

      if (a.rows !== b.rows || a.cols !== b.cols) {
        throw new Error("As matrizes devem ter as mesmas dimensões para serem somadas.");
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
        throw new Error("Os vetores devem ter a mesma dimensão para serem somados.");
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


  // --- PESSOA 3: Multiplicações ---

  times(a, b) {
    // Caso 1: Escalar à esquerda (número, estrutura)
    if (typeof a === 'number') {
      if (b instanceof Matrix) {
        let elements = [];
        for (let i = 0; i < b.rows; i++) {
          let row = [];
          for (let j = 0; j < b.cols; j++) {
            row.push(b.get(i, j) * a);
          }
          elements.push(row);
        }
        return new Matrix(b.rows, b.cols, elements);
      } else if (b instanceof Vector) {
        let elements = [];
        for (let i = 0; i < b.dim; i++) {
          elements.push(b.get(i) * a);
        }
        return new Vector(b.dim, elements);
      }
    }

    // Caso 2: Escalar à direita (estrutura, número)
    if (typeof b === 'number') {
      if (a instanceof Matrix) {
        let elements = [];
        for (let i = 0; i < a.rows; i++) {
          let row = [];
          for (let j = 0; j < a.cols; j++) {
            row.push(a.get(i, j) * b);
          }
          elements.push(row);
        }
        return new Matrix(a.rows, a.cols, elements);
      } else if (a instanceof Vector) {
        let elements = [];
        for (let i = 0; i < a.dim; i++) {
          elements.push(a.get(i) * b);
        }
        return new Vector(a.dim, elements);
      }
    }

    // Caso 3: Matriz e Matriz (Elemento a elemento)
    if (a instanceof Matrix && b instanceof Matrix) {
      if (a.rows !== b.rows || a.cols !== b.cols) {
        throw new Error("As matrizes devem ter a mesma dimensão para a operação times.");
      }

      let elements = [];
      for (let i = 0; i < a.rows; i++) {
        let row = [];
        for (let j = 0; j < a.cols; j++) {
          row.push(a.get(i, j) * b.get(i, j));
        }
        elements.push(row);
      }

      return new Matrix(a.rows, a.cols, elements);
    }

    // Caso 4: Vetor e Vetor (Elemento a elemento)
    if (a instanceof Vector && b instanceof Vector) {
      if (a.dim !== b.dim) {
        throw new Error("Os vetores devem ter a mesma dimensão para a operação times.");
      }

      let elements = [];
      for (let i = 0; i < a.dim; i++) {
        elements.push(a.get(i) * b.get(i));
      }

      return new Vector(a.dim, elements);
    }

    throw new Error("Parâmetros inválidos para o método times.");
  }


  dot(a, b) {
    // Matriz x Matriz
    if (a instanceof Matrix && b instanceof Matrix) {
      if (a.cols !== b.rows) {
        throw new Error("O número de colunas da matriz 'a' deve ser igual ao número de linhas da matriz 'b'.");
      }

      let elements = [];
      for (let i = 0; i < a.rows; i++) {
        let row = [];
        for (let j = 0; j < b.cols; j++) {
          let sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.get(i, k) * b.get(k, j);
          }
          row.push(sum);
        }
        elements.push(row);
      }

      return new Matrix(a.rows, b.cols, elements);
    }

    // Matriz x Vetor
    if (a instanceof Matrix && b instanceof Vector) {
      if (a.cols !== b.dim) {
        throw new Error("O número de colunas da matriz deve ser igual à dimensão do vetor.");
      }

      let resultElements = Array(a.rows).fill(0);
      for (let i = 0; i < a.rows; i++) {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.get(i, k) * b.get(k);
        }
        resultElements[i] = sum;
      }

      return new Vector(a.rows, resultElements);
    }

    // Vetor x Vetor (Produto Interno)
    if (a instanceof Vector && b instanceof Vector) {
      if (a.dim !== b.dim) {
        throw new Error("Os vetores devem ter a mesma dimensão para o produto interno.");
      }
      let sum = 0;
      for (let i = 0; i < a.dim; i++) {
        sum += a.get(i) * b.get(i);
      }
      return sum;
    }

    throw new Error("Parâmetros inválidos para o método dot.");
  }


  // --- PESSOA 4: Eliminação Gaussiana ---

  gauss(a) {
    if (!(a instanceof Matrix)) {
      throw new Error("O parâmetro para a função gauss deve ser um objeto da classe Matrix.");
    }

    const elementsCopy = Array.from(
      { length: a.rows },
      (_, i) =>
        Array.from(
          { length: a.cols },
          (_, j) => a.get(i, j)
        )
    );

    const res = new Matrix(a.rows, a.cols, elementsCopy);

    let pivotRow = 0;

    for (let j = 0; j < res.cols && pivotRow < res.rows; j++) {

      let maxRow = pivotRow;

      for (let i = pivotRow + 1; i < res.rows; i++) {
        if (
          Math.abs(res.get(i, j)) >
          Math.abs(res.get(maxRow, j))
        ) {
          maxRow = i;
        }
      }

      if (Math.abs(res.get(maxRow, j)) < 1e-10) {
        continue;
      }

      if (maxRow !== pivotRow) {
        const temp = res.elements[pivotRow];
        res.elements[pivotRow] = res.elements[maxRow];
        res.elements[maxRow] = temp;
      }

      for (let i = pivotRow + 1; i < res.rows; i++) {

        const factor =
          res.get(i, j) /
          res.get(pivotRow, j);

        res.set(i, j, 0);

        for (let k = j + 1; k < res.cols; k++) {

          const valorAtualizado =
            res.get(i, k) -
            factor * res.get(pivotRow, k);

          res.set(i, k, valorAtualizado);
        }
      }

      pivotRow++;
    }

    return res;
  }


  // --- PESSOA 5: Solução de Sistemas (Gauss-Jordan) ---

  solve(a) {
    if (!(a instanceof Matrix)) {
      throw new Error("O parâmetro para a função solve deve ser um objeto da classe Matrix.");
    }

    const res = this.gauss(a);

    for (let i = res.rows - 1; i >= 0; i--) {

      let pivotCol = -1;

      for (let j = 0; j < res.cols; j++) {
        if (Math.abs(res.get(i, j)) > 1e-10) {
          pivotCol = j;
          break;
        }
      }

      if (pivotCol === -1) {
        continue;
      }

      const pivotVal = res.get(i, pivotCol);

      for (let j = pivotCol; j < res.cols; j++) {
        const valor = res.get(i, j) / pivotVal;
        res.set(i, j, valor);
      }

      for (let k = 0; k < i; k++) {
        const factor = res.get(k, pivotCol);

        for (let j = pivotCol; j < res.cols; j++) {
          const valorAtualizado = res.get(k, j) - factor * res.get(i, j);
          res.set(k, j, valorAtualizado);
        }
      }
    }

    // Aplica a função arredondar apenas no resultado final pronto
    for (let i = 0; i < res.rows; i++) {
      for (let j = 0; j < res.cols; j++) {
        res.set(i, j, arredondar(res.get(i, j)));
      }
    }

    return res;
  }
}


// ==========================================
// FUNÇÕES DE TESTE ISOLADAS
// ==========================================

const la = new LinearAlgebra();


// ==========================================
// TESTES DA CLASSE MATRIX
// ==========================================

function testarMatrixGet() {
  console.log("=== Testando Matrix Get ===");

  const m1 = new Matrix(2, 2, [
    [1, 2],
    [3, 4]
  ]);

  console.log("Matrix m1 (0,1):", m1.get(0, 1));
}


function testarMatrixSet() {
  console.log("=== Testando Matrix Set ===");

  const m1 = new Matrix(2, 2, [
    [1, 2],
    [3, 4]
  ]);

  m1.set(0, 1, 10);

  console.log("Matrix após set(0, 1, 10):", m1.elements);
}


// ==========================================
// TESTES DA CLASSE VECTOR
// ==========================================

function testarVectorGet() {
  console.log("=== Testando Vector Get ===");

  const v1 = new Vector(3, [
    10, 20, 30
  ]);

  console.log("Vector v1 (2):", v1.get(2));
}


function testarVectorSet() {
  console.log("=== Testando Vector Set ===");

  const v1 = new Vector(3, [
    10, 20, 30
  ]);

  v1.set(1, 50);

  console.log("Vector após set(1, 50):", v1.elements);
}


// ==========================================
// TESTE TRANSPOSE
// ==========================================

function testarTransposta() {
  console.log("=== Testando Transpose ===");

  const m1 = new Matrix(2, 2, [
    [1, 2],
    [3, 4]
  ]);

  const m1T = la.transpose(m1);

  console.log("Matriz original:", m1.elements);
  console.log("Transposta:", m1T.elements);
}


// ==========================================
// TESTE SUM
// ==========================================

function testarSoma() {
  console.log("=== Testando Sum ===");

  const m1 = new Matrix(2, 2, [
    [1, 2],
    [3, 4]
  ]);

  const m2 = new Matrix(2, 2, [
    [5, 6],
    [7, 8]
  ]);

  const mSoma = la.sum(m1, m2);

  console.log("Matriz 1:", m1.elements);
  console.log("Matriz 2:", m2.elements);
  console.log("Soma (m1 + m2):", mSoma.elements);
}


// ==========================================
// TESTE TIMES
// ==========================================

function testarTimes() {
  console.log("=== Testando Times ===");

  const m1 = new Matrix(2, 2, [
    [1, 2],
    [3, 4]
  ]);

  const mTimes = la.times(2, m1);

  console.log("Matriz original:", m1.elements);
  console.log("Escalar 2 * m1:", mTimes.elements);
}


// ==========================================
// TESTE DOT
// ==========================================

function testarDot() {
  console.log("=== Testando Dot ===");

  const mA = new Matrix(2, 3, [
    [1, 2, 3],
    [4, 5, 6]
  ]);

  const mB = new Matrix(3, 2, [
    [7, 8],
    [9, 1],
    [2, 3]
  ]);

  const mDot = la.dot(mA, mB);

  console.log("Matriz A:", mA.elements);
  console.log("Matriz B:", mB.elements);
  console.log("Produto Matricial:", mDot.elements);
}


// ==========================================
// TESTE GAUSS
// ==========================================

function testarGauss() {
  console.log("=== Testando Eliminação Gaussiana ===");

  const sistemaMatriz = new Matrix(3, 4, [
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
  ]);

  console.log("Matriz Original:", sistemaMatriz.elements);

  const gaussRes = la.gauss(sistemaMatriz);

  console.log("Após Gauss (Escalonada):", gaussRes.elements);
}


// ==========================================
// TESTE GAUSS-JORDAN
// ==========================================

function testarGaussJordan() {
  console.log("=== Testando Gauss-Jordan (Solve) ===");

  const sistemaMatriz = new Matrix(3, 4, [
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
  ]);

  console.log("Matriz Original:", sistemaMatriz.elements);

  const solucao = la.solve(sistemaMatriz);

  console.log("Solução do Sistema:", solucao.elements);

  console.log(
    "Valores -> x:", solucao.get(0, 3),
    "y:", solucao.get(1, 3),
    "z:", solucao.get(2, 3)
  );
}


// ==========================================
// EXECUÇÃO SELETIVA
// ==========================================

// testarMatrixGet();
// testarMatrixSet();
// testarVectorGet();
// testarVectorSet();
// testarTransposta();
// testarSoma();
// testarTimes();
// testarDot();
// testarGauss();
testarGaussJordan();