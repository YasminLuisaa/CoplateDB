import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contribuir() {
  // Simulação de autenticação (substitua por lógica real)
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cidade: "",
    data: "",
    nome: "",
    cpf: "",
    arquivo: null as File | null,
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Você precisa estar logado para contribuir</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/login")}
        >
          Ir para login
        </button>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!form.cidade || !form.data || !form.nome || !form.cpf || !form.arquivo) {
      setErro("Preencha todos os campos e selecione um arquivo.");
      return;
    }
    // Aqui você faria o upload para o backend
    setSucesso("Contribuição enviada com sucesso!");
    setForm({ cidade: "", data: "", nome: "", cpf: "", arquivo: null });
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-12 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Contribuir com o Banco de Dados</h1>
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Data do envio</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">CPF</label>
          <input
            type="text"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            pattern="\d{11}"
            maxLength={11}
            minLength={11}
            placeholder="Somente números"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Arquivo de imagem</label>
          <input
            type="file"
            name="arquivo"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        {erro && <div className="text-red-600 mb-2">{erro}</div>}
        {sucesso && <div className="text-green-600 mb-2">{sucesso}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
        >
          Enviar contribuição
        </button>
      </form>
    </div>
  );
}
