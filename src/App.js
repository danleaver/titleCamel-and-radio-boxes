import { useEffect, useState } from 'react';
import axios from 'axios'

const radioButtons = [
  "trivia",
  "math",
  "year",
  "date",
]

const readCamel = (str) => str.charAt(0).toUpperCase() + str.slice(1).replace(/([a-z\d])([A-Z])/g, '$1' + " " + '$2')

function App() {
  const [formValues, setFormValues] = useState({
    number: "",
    category: "trivia"
  })

  const fetchData = () => {
    axios.get(`http://numbersapi.com/${formValues.number}/${formValues.category}`)
      .then(res => console.log(res.data))
      .catch(console.log)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="number" onChange={handleChange} value={formValues.number} />
        <div>
          {radioButtons.map((item, idx) => (
            <div key={idx}>
              <label>{readCamel(item)}</label>
              <input onChange={handleChange} type="radio" name="category" value={item} defaultChecked={!idx}/>
            </div>
          ))}
        </div>
        <button type="submit"> get it done </button>
      </form>
    </div>
  );
}

export default App;
