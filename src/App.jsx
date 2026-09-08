import { useEffect, useState } from "react";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function buscarUsuarios() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/usuariosenterrado",
          {
            signal: controller.signal,
          }
        );

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`);
        }

        const data = await resposta.json();

        setUsuarios(data);
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
    return <h2>Carregando...</h2>;
  }

  if (erro) {
    return <h2>Erro: {erro}</h2>;
  }

  if (usuarios.length === 0) {
    return <h2>Nenhum usuário encontrado.</h2>;
  }

  return (
    <div>
      <h1>Usuários</h1>

      <ul>
        {usuarios.slice(0, 10).map((usuario) => (
          <li key={usuario.id}>{usuario.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
