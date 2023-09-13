const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn');
const User = require('./models/User');
const Book = require('./models/Book')

const Usar = require('./models/User');
const Livre = require('./models/Book');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));


//CADASTRAR USUÁRIOS
app.get('/user/create', (req, res) => {
    return res.render('userAdd')
})
app.post('/user/create', async (req, res) => {
    const { name, occupation } = req.body
    let newsletter = req.body.newsletter

    console.log(name, occupation, newsletter)

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({ name, occupation, newsletter })
    return res.redirect('/')
})

// VISUALIZAR TODOS OS USUARIOS CADASTRADOS
app.get('/user/view', async (req, res) => {
    const users = await User.findAll({ raw: true })
    console.log(users)
    return res.render('listarUser', { users });
})
// VER DETALHES DE UM ÚNICO USUÁRIO
app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    
    const user = await User.findOne({ raw: true, where: { id: id } })
    console.log(user)
    return res.render('viewUser', { user })
})
// DELETAR USUÁRIO
app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id
    await User.destroy({ where: { id: id } })
    return res.redirect('/')
})

//PÁGINA INICIAL
app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true })
    console.log(users)
    return res.render('home', { users });
})
// EDITAR USUÁRIO
app.get('/users/edit/:id', async (req, res)=>{
    const id = req.params.id
    const user = await User.findOne({raw: true, where: {id:id}})


    return res.render('editUser', {user:user})
})
// ATUALIZAR USUÁRIO
app.post('/users/update', async (req, res)=>{
    const {id, name, occupation} = req.body
    let newsletter = req.body.newsletter


    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    const UserData = {
        id,
        name,
        occupation,
        newsletter
    }
    await User.update(UserData, {where: { id:id} })
    return res.redirect('/')
})

// CADASTRAR LIVROS
app.get('/book/add', (req, res) => {
    return res.render('livroAdd')
})
app.post('/book/add', async (req, res) => {
    const { nomeL, autor, preco } = req.body
    let capaDura = req.body.capaDura

    console.log(nomeL, autor, preco, capaDura)

    if (capaDura === 'on') {
        capaDura = true
    } else {
        capaDura = false
    }

    await Book.create({ nomeL, autor, preco, capaDura })
    return res.redirect('/')
})
//LISTAR LIVROS
app.get('/book/view', async (req, res) => {
    const books = await Book.findAll({ raw: true })
    console.log(books)
    return res.render('listarLivro', { books });
})
// VER DETALHES DE UM ÚNICO LIVRO
app.get('/books/:id', async (req, res) => {
    const id = req.params.id
    
    const book = await Book.findOne({ raw: true, where: { id: id } })
    console.log(book)
    return res.render('viewBook', { book })
})
// DELETAR LIVRO
app.post('/books/delete/:id', async (req, res) => {
    const id = req.params.id
    await Book.destroy({ where: { id: id } })
    return res.redirect('/')
})
// EDITAR LIVRO
app.get('/books/edit/:id', async (req, res)=>{
    const id = req.params.id
    const book = await Book.findOne({raw: true, where: {id:id}})


    return res.render('editBook', {book:book})
})
// ATUALIZAR LIVRO
app.post('/books/update', async (req, res)=>{
    const {id, nomeL, autor, preco} = req.body
    let capaDura = req.body.capaDura


    if(capaDura === 'on'){
        capaDura = true
    }else{
        capaDura = false
    }
    const BookData = {
        id,
        nomeL,
        autor,
        preco
    }
    await Book.update(BookData, {where: { id:id} })
    return res.redirect('/')
})
conn.sync().then(() => {
    app.listen(3333, () => {
        console.log('ON');
    })
}).catch((err) => console.log(err)) 