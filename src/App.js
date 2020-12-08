import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { startAdvicePolling, stopAdvicePolling, updateFrequency } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const advice = useSelector(state => state.adviceReducer.advice);
  const frequency = useSelector(state => state.adviceReducer.frequency);

  const getAdvice = () => {
    if (frequency > 0 && frequency <= 10) {
      dispatch(startAdvicePolling());
    }
    else {
      alert('Please select between 1 and 10 seconds.');
    }
  }
  
  return (
    <div className='App'>
      <div className='adviceContainer'>
        <h1>{advice ? advice : 'Start polling to read random bits of advice'}</h1>
        <div className='frequencyContainer'>
          <label htmlFor='pollingSeconds'>How frequently do you need advice (in seconds)?</label>
          <input max={10} min={1} name='pollingSeconds' type='number' value={frequency} onChange={e => dispatch(updateFrequency(e.target.value))} />
        </div>
        <div className='buttonsContainer'>
          <button onClick={getAdvice}>Start Polling</button>
          <button onClick={() => dispatch(stopAdvicePolling())}>Stop Polling</button>
        </div>
      </div>
    </div>
  );
}

export default App;
