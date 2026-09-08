import { useEffect, useState } from "react";

function StatusAPI() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function buscarUsuarios() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            signal: controller.signal,
          }
        );

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`);
        }

        const data = await resposta.json();

        setItens(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Requisição cancelada.");
          return;
        }

        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuarios();

    return () => {
      controller.abort();
    };
  }, []);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (erro) {
    return <p>Erro: {erro}</p>;
  }

  if (itens.length === 0) {
    return <p>Nenhum item encontrado.</p>;
  }

  return <p>Sucesso: {itens.length} itens carregados.</p>;
}

function App() {
  return (
    <div>
      <h1>Status da API</h1>

      <StatusAPI />
    </div>
  );
}

export default App;
