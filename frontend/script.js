const input_cpf = document.getElementById("cpf");
const input_telefone = document.getElementById("telefone");
const input_idade = document.getElementById("idade");
const input_nome = document.getElementById("nome");
const input_email = document.getElementById("email");
const input_id = document.getElementById("id");
const botao_salvar = document.getElementById("cadastrar");
const botao_editar = document.getElementById("editar");
const input_buscar = document.getElementById("buscar_input");
const botao_buscar = document.getElementById("buscar_btn");

async function listarPessoas() {
  try {
    const response = await fetch("http://localhost:3000/pessoa");
    const pessoas = await response.json();

    console.log(pessoas);
  } catch (error) {
    console.error("Erro:", error);
  }
}

botao_buscar.addEventListener("click", async () => {
  const id = input_buscar.value;

  if(id==""){
    listarPessoas();
  }

  try {
    const response = await fetch(`http://localhost:3000/pessoa/${id}`);
    if (!response.ok) throw new Error("Pessoa não encontrada");

    const pessoa = await response.json();
    console.log(pessoa);
  } catch (error) {
    console.error(error);
  }
});

botao_editar.addEventListener("click", async () => {
  const id = input_id.value; 

  const pessoa = {
    Nome: input_nome.value,
    Email: input_email.value,
    CPF: input_cpf.value,
    Telefone: input_telefone.value,
    Idade: input_idade.value
  };

  try {
    const response = await fetch(`http://localhost:3000/pessoa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pessoa)
    });

    if (!response.ok) throw new Error("Erro ao editar pessoa");

    const data = await response.json();
    console.log("Pessoa editada:", data);

    alert("Pessoa editada com sucesso!");
  } catch (error) {
    console.error(error);
  }
});


async function deletarPessoa(id) {
  try {
    const response = await fetch(`http://localhost:3000/pessoa/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Erro ao deletar pessoa");

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
}


botao_salvar.addEventListener("click", async () => {
  const pessoa = {
    Nome: input_nome.value,
    Email: input_email.value,
    CPF: input_cpf.value,
    Telefone: input_telefone.value,
    Idade: input_idade.value,
  };

  try {
    const response = await fetch("http://localhost:3000/pessoa", {
      // ajuste a URL conforme seu backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pessoa),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar pessoa");
    }

    const data = await response.json();
    console.log("Pessoa cadastrada:", data);

    alert("Pessoa cadastrada com sucesso!");
  } catch (error) {
    console.error("Erro:", error);
  }
});
