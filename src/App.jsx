import { Link,Switch,Route } from 'react-router-dom/cjs/react-router-dom.min'
import Posts from './component/Posts'
import Users from './component/Users'
import Todos from './component/Todos'
import OnePost from './component/OnePost'


const App = () => {
  
  return (
    <div className='container my-3'>
      <Link to="/Posts" className='btn btn-dark mx-2'>Posts</Link>
      <Link to="/Todos" className='btn btn-dark mx-2'>Todos</Link>
      <Link to="/Users" className='btn btn-dark mx-2'>Users</Link>

    <hr />
      <div className="row">
      <Switch>
        <Route path='/Posts/:id' component={OnePost}/>
        <Route path='/Posts' component={Posts}/>
        <Route path='/Todos' component={Todos}/>
        <Route path='/Users' component={Users}/>
      </Switch>

      </div>
    </div>
    
  )
}

export default App