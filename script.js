// Função para validar o CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');

  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

// Função para validar o CNPJ
function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');

  if (
    cnpj.length !== 14 ||
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  ) {
    return false;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(0))) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(1))) {
    return false;
  }

  return true;
}

// Função para formatar a data de nascimento
function formatarDataNascimento(data) {
  const dataParts = data.split("/");
  const dia = dataParts[0];
  const mes = dataParts[1];
  const ano = dataParts[2];
  return dia + "/" + mes + "/" + ano;
}

// Função para formatar o limite de crédito
function formatarLimiteCredito(limite) {
  const formatted = parseFloat(limite).toFixed(2);
  return "R$" + formatted.replace(".", ",");
}

// Função para exibir os campos adicionais de acordo com o tipo de cliente selecionado
function exibirCamposAdicionais() {
  var tipoClienteSelect = document.getElementById("tipoClienteSelect");
  var camposAdicionais = document.getElementById("camposAdicionais");
  camposAdicionais.innerHTML = "";

  if (tipoClienteSelect.value === "pessoaFisica") {
    camposAdicionais.innerHTML = `
      <label for="cpfInput">CPF:</label>
      <input type="text" id="cpfInput" required>
      <br><br>
    `;
  } else if (tipoClienteSelect.value === "pessoaJuridica") {
    camposAdicionais.innerHTML = `
      <label for="cnpjInput">CNPJ:</label>
      <input type="text" id="cnpjInput" required>
      <br><br>
    `;
  }
}

// Função para cadastrar o cliente
function cadastrarCliente(event) {
  event.preventDefault();

  try {
    var nome = document.getElementById("nomeInput").value;
    var id = document.getElementById("idInput").value;
    var tipoClienteSelect = document.getElementById("tipoClienteSelect");
    var tipoCliente = tipoClienteSelect.value;
    var endereco = document.getElementById("enderecoInput").value;
    var cep = document.getElementById("cepInput").value;
    var dataNascimento = document.getElementById("dataNascimentoInput").value;
    var vendedor = document.getElementById("vendedorInput").value;
    var limiteCredito = document.getElementById("limiteCreditoInput").value;

    // Validar o nome
    if (!/^[a-zA-Z ]{2,}$/.test(nome) || nome.split(" ").length < 2) {
      throw new Error("Nome inválido! O nome deve conter apenas letras com no mínimo 2 letras e ser composto por mais de dois nomes.");
    }

    // Validar o ID
    if (!/^\d+$/.test(id)) {
      throw new Error("ID inválido! O ID deve conter apenas números.");
    }

    // Validar o tipo de cliente e o CPF/CNPJ correspondente
    if (tipoCliente === "pessoaFisica") {
      var cpf = document.getElementById("cpfInput").value;

      if (!validarCPF(cpf)) {
        throw new Error("CPF inválido! Por favor, corrija o CPF.");
      }
    } else if (tipoCliente === "pessoaJuridica") {
      var cnpj = document.getElementById("cnpjInput").value;

      if (!validarCNPJ(cnpj)) {
        throw new Error("CNPJ inválido! Por favor, corrija o CNPJ.");
      }
    }

    // Validar o endereço
    if (!/^[a-zA-Z ]+$/.test(endereco)) {
      throw new Error("Endereço inválido! O endereço deve conter apenas letras.");
    }

    // Validar o CEP
    if (!/^\d{5}-\d{3}$/.test(cep)) {
      throw new Error("CEP inválido! Por favor, corrija o CEP.");
    }

    // Validar a data de nascimento
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
      throw new Error("Data de Nascimento inválida! Por favor, corrija a data de nascimento.");
    }

    // Validar o vendedor
    if (!/^[a-zA-Z ]{2,}$/.test(vendedor) || vendedor.split(" ").length < 2) {
      throw new Error("Vendedor inválido! O vendedor deve conter apenas letras com no mínimo 2 letras e ser composto por mais de dois nomes.");
    }

    // Validar o limite de crédito
    if (!/^\d+\.\d{2}$/.test(limiteCredito)) {
      throw new Error("Limite de Crédito inválido! O limite de crédito deve conter apenas números com no mínimo 2 casas decimais.");
    }

    // Formatando os campos
    var dataNascimentoFormatada = formatarDataNascimento(dataNascimento);
    var limiteCreditoFormatado = formatarLimiteCredito(limiteCredito);

    // Armazenando os dados no cookie
    document.cookie = "nome=" + nome + ";";
    document.cookie = "id=" + id + ";";

    // Exibindo os dados do formulário
    document.getElementById("formTitle").textContent = "Dados do Formulário";
    document.getElementById("cadastroForm").innerHTML = `
      <p>Nome: ${nome}</p>
      <p>ID: ${id}</p>
      <p>Tipo de Cliente: ${tipoCliente}</p>
      <p>Endereço: ${endereco}</p>
      <p>CEP: ${cep}</p>
      <p>Data de Nascimento: ${dataNascimentoFormatada}</p>
      <p>Vendedor: ${vendedor}</p>
      <p>Limite de Crédito: ${limiteCreditoFormatado}</p>
    `;
  } catch (error) {
    alert(error.message);
  }

  return false;
}
