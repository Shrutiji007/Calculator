let display = document.getElementById('display');

function append(char) {
  const current = display.innerText;
  const lastChar = current.slice(-1);

  const operators = ['+', '-', '*', '/', '%', '.', '÷', '×'];

  // Prevent multiple leading zeros
  if (current === '0' && char !== '.' && !operators.includes(char)) {
    display.innerText = char;
    return;
  }

  // Prevent two operators in a row
  if (operators.includes(lastChar) && operators.includes(char)) {
    return;
  }

  // Prevent multiple decimals in a number
  if (char === '.') {
    const parts = current.split(/[\+\-\*\/÷×]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes('.')) return;
  }

  // If "0" or "Error", start fresh
  if (current === '0' || current === 'Error') {
    if (operators.includes(char)) return; // Don't start with operator
    display.innerText = char;
  } else {
    display.innerText += char;
  }
}


function clearDisplay() {
  display.innerText = '0';
}

function backspace() {
  if (display.innerText.length === 1 || display.innerText === 'Error') {
    display.innerText = '0';
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function calculate() {
  try {
    let expression = display.innerText
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/%/g, '*0.01'); // ← safer percentage logic

    const result = Function(`"use strict"; return (${expression})`)();
    display.innerText = result;
  } catch {
    display.innerText = 'Error';
  }
}

// Theme toggle
document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
});



document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '%', '.'].includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === 'x' || key === 'X') {
    append('*'); // allow x as multiply
  } else if (key === '/') {
    append('/');
  }
});

