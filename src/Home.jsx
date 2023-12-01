import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [expressionInfo, setExpressionInfo] = useState([]);


  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  };

  const calculate = async () => {
    try {
      const response = await fetch('http://localhost:5000/calculate?expression=' + encodeURIComponent(result));
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result.toString());
      }
      setExpressionInfo(data.expression_info || []);
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const clear = () => {
    setResult('');
    setError('');
  };

  const deleteLastDigit = () => {
    setResult(result.slice(0, -1));
    setError('');
  };

  return (
    <div className="calculator">
      <input type="text" value={result} placeholder="Welcome" />

      <div className="keypad">
        <button className="delete" onClick={deleteLastDigit}>
          {"supr"}
        </button>
        <button className="delete" onClick={clear}>
        all
      </button>
        <button className="operator" name="+" onClick={handleClick}>
          +
        </button>
        <button className="operator" name="-" onClick={handleClick}>
          -
        </button>
        <button className="operator" name="*" onClick={handleClick}>
          *
        </button>
        <button className="operator" name="/" onClick={handleClick}>
          /
        </button>
        <button className="operator" name="%" onClick={handleClick}>
          %
        </button>
        <button className="operator" name="^" onClick={handleClick}>
          ^
        </button>
        <button className="operator" name="(" onClick={handleClick}>
          (
        </button>
        <button className="operator" name=")" onClick={handleClick}>
          )
        </button>
        <button className="operator" name="√" onClick={handleClick}>
          √
        </button>

        <button name="7" onClick={handleClick}>
          7
        </button>
        <button name="8" onClick={handleClick}>
          8
        </button>
        <button name="9" onClick={handleClick}>
          9
        </button>

        <button name="4" onClick={handleClick}>
          4
        </button>
        <button name="5" onClick={handleClick}>
          5
        </button>
        <button name="6" onClick={handleClick}>
          6
        </button>

        <button name="1" onClick={handleClick}>
          1
        </button>
        <button name="2" onClick={handleClick}>
          2
        </button>
        <button name="3" onClick={handleClick}>
          3
        </button>

        <button name="0" onClick={handleClick}>
          0
        </button>
        <button className="operator" name="." onClick={handleClick}>
          .
        </button>
        <button className="equal" onClick={calculate}>
          =
        </button>
      </div>

  

      <h1 className="error_titulo">Error Léxico y sintáctico: </h1>
      {error && <div className="error">{error}</div>}

      {expressionInfo.length > 0 && (
        <div>
          <h1 className='error_titulo'>Información de la expresión:</h1>
          <ul>
            {expressionInfo.map((info, index) => (
              <li key={index}>
                {info.value} es un {info.type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
