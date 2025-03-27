import React from 'react'
import '../styles/calculator.css'
import { useState } from 'react'

const Calculator = () => {
  const [calc, setCalc] = useState("");
  return (
    <div class="calculator">
        <div class="display">
            <input type="text" value={calc} placeholder="0" />
        </div>
        <div class="buttons">
            <button class="btn light">%</button>
            <button class="btn light">√</button>
            <button class="btn light">CE</button>
            <button class="btn dark">C</button>

            <button class="btn">7</button>
            <button class="btn">8</button>
            <button class="btn">9</button>
            <button class="btn red">−</button>

            <button class="btn">4</button>
            <button class="btn">5</button>
            <button class="btn">6</button>
            <button class="btn blue">÷</button>

            <button class="btn">1</button>
            <button class="btn">2</button>
            <button class="btn">3</button>
            <button class="btn yellow">×</button>

            <button class="btn">.</button>
            <button class="btn">0</button>
            <button class="btn">=</button>
            <button class="btn green">+</button>
        </div>
    </div>
  )
}

export default Calculator