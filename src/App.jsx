async function buscarUsuarios() {
  try {
    setCarregando(true);
    setErro("");

    await new Promise((resolve) => setTimeout(resolve, 5000));

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