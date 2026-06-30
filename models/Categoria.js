import conexao from "../config/conexao.js";

const CategoriaSchema = new conexao.Schema({
  nome: String,
  descricao: String
});

const Categoria = conexao.model("Categoria", CategoriaSchema);

export default Categoria;