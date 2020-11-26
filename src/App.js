import {useState, useEffect} from 'react'
import {db} from './firebase.js'

function App() {

  const [books, setBooks] = useState([])
  const [book, setBook] = useState([])
  const [title, setTitle] = useState([])
  const [classn, setClassn] = useState([])
  const [editorial, setEditorial] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')

  const getBooks = async () => {
    const data = await db.collection('books').get()
    const resi = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setBooks(resi)
    console.log(resi)
  }

  useEffect(()=> {
    getBooks()
  },[])


  const agregarBook = async(e) =>{
    e.preventDefault()

    if(!book.trim()){
      console.log("vacío.")
      return
    }
    if(!title.trim()){
      console.log("vacío.")
      return
    }
    if(!classn.trim()){
      console.log("vacío.")
      return
    }
    if(!editorial.trim()){
      console.log("vacío.")
      return
    }

    const firebaseBook = await db.collection('books').add({
      autor: book,
      titulo: title,
      clasificacion: classn,
      editorial: editorial
    }) 

    const newBookObject = {
      autor: book,
      titulo: title,
      clasificacion: classn,
      editorial: editorial
    }

    setBooks([...books, {id: firebaseBook.id, ...newBookObject}])
    setId('')
    setBook('')
    setTitle('')
    setClassn('')
    setEditorial('')
  }

  const aEdicion = (item)=>{
    setModoEdicion(true)
    setBook(item.autor)
    setTitle(item.titulo)
    setClassn(item.clasificacion)
    setEditorial(item.editorial)
    setId(item.id)

  }

  const editarBook = async (e) =>{
    e.preventDefault();
    await db.collection('books').doc(id).update({
      autor: book,
      titulo: title,
      clasificacion: classn,
      editorial: editorial
    })
    const editArray = books.map(item => (
      item.id === id ? {id: item.id, autor: book, titulo: title} : item
    ))
    setBooks(editArray)
    setModoEdicion(false)
    setId('')
    setBook('')
    setTitle('')
    setClassn('')
    setEditorial('')
  }

  const eBook = async (id) => {
    await db.collection('books').doc(id).delete()
    const fBook = books.filter(item => item.id !== id)
    setBooks(fBook)
  }

  return (
    <div className="container">
      <p>Paradigmas de programación parcial 3</p> 
      <p>Miguel Angel Bui Rosas 320704</p>
      <h2>
        {modoEdicion ? 'Editar' :'Agregar libro'}
      </h2>
      <form onSubmit={modoEdicion ? editarBook : agregarBook}>
        <div className="form-group">

          <label>Autor</label>
          <input type="text" className="form-control" value={book} onChange={e => setBook(e.target.value)} placeholder="Autor del libro" required />
          <label>Titulo</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo del libro" required />
          <label>Clasificación</label>
          <input type="text" className="form-control" value={classn} onChange={e => setClassn(e.target.value)} placeholder="Clasificación del libro" required />
          <label>Editorial</label>
          <input type="text" className="form-control" value={editorial} onChange={e => setEditorial(e.target.value)} placeholder="Editorial del libro" required />
        </div>
        <button type="submit" className="btn btn-success">Aceptar</button>
        <hr></hr>

      </form>
      <ul className="list-group">
        {
          books.map(item => (
            <li className="list-group-item" key={item.id}>
              <span>Autor: {item.autor} | Clasificación: {item.clasificacion} |</span>
              <span>Editorial: {item.editorial} | Titulo: {item.titulo} | </span>
              <span>ID: {item.id}</span>
              <hr></hr>
              <button className="btn btn-outline-danger btn-sm float-right" onClick={()=>eBook(item.id)}>Eliminar</button>
              <button className="btn btn-outline-warning btn-sm float-left mr-2" onClick={()=>aEdicion(item)}>Editar</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
