import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getNames, udpateCount } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.dataReducer.count);
  const names = useSelector(state => state.dataReducer.data);

  const fetchNames = () => {
    if (count > 0) {
      dispatch(getNames(count))
    }
    else if (count > 10) {
      dispatch(getNames(10));
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(udpateCount(e.target.value));
  }

  return (
    <div className="App">
      <div>
        <label htmlFor='numNames'>How many names?</label>
        <input max={10} min={0} name='numNames' type='number' value={count} onChange={handleSubmit} />
      </div>
      <button onClick={fetchNames}>Get Names</button>

			<ul>
				{names.map(({ name }) => <li key={`${name.first}${name.last}`}>{name.first}</li>)}
			</ul>
    </div>
  );
}

export default App;
