import { useEffect, useState } from 'react';
import './App.css';
import useGetTodos from './hooks/useGetTodos';

function App() {

  const todos = useGetTodos('https://jsonplaceholder.typicode.com/todos');

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);

  let pagesCount = 23;
  let pageItems = Math.ceil(todos.length / pagesCount);
  let pageNumbers = Array.from(Array(pagesCount).keys());

  let startIndex, endIndex;

  useEffect(() => {
    console.log('currentPage', currentPage);
    console.log('pageItems', pageItems);
    console.log('todoslength', todos.length);
    // console.log('pagesCount', pagesCount);
    console.log('our estimate:', Math.ceil(todos.length / pagesCount));
    endIndex = pageItems * currentPage;
    startIndex = endIndex - pageItems;
    let shownTodos = todos.slice(startIndex, endIndex);
    setPaginatedTodos(shownTodos);
    console.log('startIndex', startIndex);
    console.log('endIndex', endIndex);
    console.log('shownTodos', shownTodos);
  }, [currentPage])

  const nextPage = page => {
    if (currentPage == pageItems) {
      setCurrentPage(pageItems)
    }
    else {
      setCurrentPage(page + 1);
    }
  }

  const previousPage = page => {
    if (currentPage == 1) {
      setCurrentPage(1)
    } else {
      setCurrentPage(page - 1);
    }

  }

  const setPage = currentPage => {
    setCurrentPage(currentPage)
  }





  return (
    <>
    <header className='header'>
      <h1 className="header-title">Moji Pagination Practic</h1>
      <img src="images/Moji.jpg" alt="Moji" className="header-image" />
    </header>

      <div className='mx-auto mt-5'>
        <div className="table-section">
          <table className='table table-striped table-dark'>
            <thead className='table-header'>
              <th>Number</th>
              <th>UserId</th>
              <th>Title</th>
              <th>Status</th>
            </thead>

            <tbody>
              {paginatedTodos.map(todo =>
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.userId}</td>
                  <td>{todo.title}</td>
                  <td>
                    <button className={todo.completed ? 'btn btn-success' : 'btn btn-danger'}>
                      {todo.completed ? 'Completed' : 'Pending'}
                    </button>
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-center">
            <li className="page-item"
              onClick={() => previousPage(currentPage)}>
              <a className="page-link" href='javascript:void(0)'>Previous</a>
            </li>
            {pageNumbers.map(pageNumber => (
              <li className={`${pageNumber + 1 === currentPage ? 'page-item active' : 'page-item'}`}
                key={pageNumber}
                onClick={() => setPage(pageNumber + 1)}
              >
                <a className="page-link" href="javascript:void(0)">{pageNumber + 1}</a>
              </li>
            ))}
            <li className="page-item" onClick={() => nextPage(currentPage)}>
              <a className="page-link" href='javascript:void(0)'>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default App
