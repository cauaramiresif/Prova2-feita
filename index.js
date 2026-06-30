import express from "express";
import Categoria from './models/Categoria.js';
import Medicamento from './models/Medicamento.js';

const app = express();
const PORT = 3000;



// Configura o EJS como motor de views
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// pasta onde ficam os arquivos .ejs
app.set("views", "./views"); 
//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))



app.get("/", (req, res) => {
  res.render("index");
});

//Rotas de categoria

app.get("/categoria/lst", async (req, res) => {
  const categorias = await Categoria.find()
  res.render("categoria/lst", {categorias});
});

app.get("/categoria/add", (req, res) => {
  res.render("categoria/add");
});

app.post("/categoria/add", async (req, res) => {
  const {nome, descricao} = req.body;

  await Categoria.create({nome, descricao})
  res.render("categoria/addok");
});


//Rotas de medicamento

app.get("/medicamento/lst", async (req, res) => {
  //buscando as musicas no BD
  const medicamentos = await Medicamento.find()
  res.render("medicamento/lst", {medicamentos});
});

app.get("/medicamento/add", (req, res) => {
  res.render("medicamento/add");
});

app.post("/medicamento/add", async (req, res) => {
  const {nome, fabricante, preco, controlado, quantidade} = req.body;

  await Medicamento.create({nome, fabricante, preco, controlado, quantidade})
  res.render("medicamento/addok");
});

//Excluir

app.get('/categoria/del/:id', async (req, res) => {

const categoria = await Categoria.findByIdAndDelete(req.params.id)

res.redirect("/categoria/lst")

})

app.get('/medicamento/del/:id', async (req, res) => {

const medicamento = await Medicamento.findByIdAndDelete(req.params.id)

res.redirect("/medicamento/lst")

})

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  res.render("cadastrook");
});

app.get("/lista", (req, res) => {
  res.render("lista");
});

//Edição

app.get('/categoria/edt/:id', async (req, res) => {

const categoria = await Categoria.findById(req.params.id)

res.render("categoria/edt", {categoria})

})

app.post('/categoria/edt/:id', async (req, res) => {

const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body)

res.render("categoria/edtok")

})

app.get('/medicamento/edt/:id', async (req, res) => {

const medicamento = await Medicamento.findById(req.params.id)

res.render("medicamento/edt", {medicamento})

})

app.post('/medicamento/edt/:id', async (req, res) => {

const medicamento = await Medicamento.findByIdAndUpdate(req.params.id, req.body)

res.render("medicamento/edtok")

})

//rota para pesquisar categoria por nome
app.post('/categoria/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const categorias = await Categoria.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("categoria/lst", { categorias });
})

//rota para pesquisar medicamento por nome
app.post('/medicamento/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const medicamentos = await Medicamento.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("medicamento/lst", { medicamentos });
})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
