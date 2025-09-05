const input_cpf = document.getElementById("cpf");
const input_telefone = document.getElementById("telefone");
const input_idade = document.getElementById("idade");
const input_nome = document.getElementById("nome");
const input_email = document.getElementById("email");
const input_id = document.getElementById("Id");
const botao_salvar = document.getElementById("cadastrar");
const botao_editar = document.getElementById("editar");
const input_buscar = document.getElementById("buscar_input");
const botao_buscar = document.getElementById("buscar_btn");

async function listarPessoas() {
  try {
    const response = await fetch("http://localhost:3000/api/pessoas");
    const pessoas = await response.json();

    console.log(pessoas);
  } catch (error) {
    console.error("Erro:", error);
  }

  atualizarCards(await fetch("http://localhost:3000/api/pessoas").then(res => res.json()));

}

botao_buscar.addEventListener("click", async () => {
  const id = input_buscar.value;

  if(id==""){
    listarPessoas();
  }

  try {
    const response = await fetch(`http://localhost:3000/api/pessoas/${id}`);
    if (!response.ok) throw new Error("Pessoa não encontrada");

    const pessoa = await response.json();
    console.log(pessoa);
  } catch (error) {
    console.error(error);
  }

  const pessoa = await fetch(`http://localhost:3000/api/pessoas/${id}`).then(res => res.json());
  atualizarCards([pessoa]);
  
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
    const response = await fetch(`http://localhost:3000/api/pessoas/${id}`, {
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

  atualizarCards(await fetch("http://localhost:3000/api/pessoas").then(res => res.json()));

});


async function deletarPessoa(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/pessoas/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Erro ao deletar pessoa");

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }

  atualizarCards(await fetch("http://localhost:3000/api/pessoas").then(res => res.json()));

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
    const response = await fetch("http://localhost:3000/api/pessoas", {
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

  atualizarCards(await fetch("http://localhost:3000/api/pessoas").then(res => res.json()));

});


function atualizarCards(pessoas) {
  const container = document.getElementById('cards-container');
  console.log(pessoas)
  // Limpa o conteúdo atual
  container.innerHTML = '';

  // Cria e insere os cards
  pessoas.forEach(pessoa => {
      const card = document.createElement('div');
      card.style.border = '1px solid #ccc';
      card.style.borderRadius = '8px';
      card.style.padding = '10px';
      card.style.margin = '10px';
      card.style.width = '150px';
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

      card.innerHTML = `
          <p><strong>ID:</strong> ${pessoa.Id}</p>
          <p><strong>Nome:</strong> ${pessoa.Nome}</p>
          <p><strong>CPF:</strong> ${pessoa.CPF}</p>
          <p><strong>Idade:</strong> ${pessoa.Idade}</p>
          <p><strong>Email:</strong> ${pessoa.Email}</p>
      `;

      container.appendChild(card);
  });
}
