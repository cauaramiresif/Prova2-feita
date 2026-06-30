import conexao from "../config/conexao.js";

const MedicamentoSchema = new conexao.Schema({
  nome: String,
  fabricante: String,
  preco: Number,
  controlado: String,
  quantidade: Number
});

const Medicamento = conexao.model("Medicamento", MedicamentoSchema);

export default Medicamento;