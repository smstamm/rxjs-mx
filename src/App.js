import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAdvice, getNames, stopAdvicePolling, updateCount } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const advice = useSelector(state => state.dataReducer.advice);
  const count = useSelector(state => state.dataReducer.count);
  const names = useSelector(state => state.dataReducer.data);

  const fetchNames = () => {
    // todo fix more than 10 issue
    if (count > 0) {
      dispatch(getNames(count))
    }
    else if (count > 10) {
      dispatch(getNames(10));
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateCount(e.target.value));
  }

  return (
    <div className="App">
      <div className="advice">
        <h1>{advice ? advice : 'Click for random bits of advice'}</h1>
        <div className="buttons">
          <button onClick={() => dispatch(getAdvice())}>Start Polling</button>
          <button onClick={() => dispatch(stopAdvicePolling())}>Stop Polling</button>
        </div>
      </div>

      <hr/>
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
