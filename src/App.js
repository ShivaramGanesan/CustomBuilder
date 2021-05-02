import logo from './logo.svg';
import './App.css';
import { BaseBuilder, TextComponent } from './Components';
import { Provider } from 'react-redux'

function App() {
  return (
      <BaseBuilder prop={{components:[], featureComponents:
        [{
        "name": "text",
        "display": "Text"
        },
        {
          "name" :"background",
          "display": "Background"
        },
        {
          "name": "divider",
          "display": "Divider"
        },{
          "name": "bullet",
          "display": "Bullet Text"
        }]
      }}/>
  );
}

export default App;
