import React from 'react';
import ReactDOM from 'react-dom';

// Services
import Home from './services/Home/Home.jsx';
import Photos from './services/Photos/Photos.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isHome: true,
      yAxis: 0,
      photos: {
        home: [],
        livingRoom: [],
        kitchen: [],
        bedroom: [],
        bathroom: [],
        interior: [],
        other: [],
        backyard: [],
        pets: [],
      },
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/retrieve', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const home = [];
        const livingRoom = [];
        const kitchen = [];
        const bedroom = [];
        const bathroom = [];
        const interior = [];
        const other = [];
        const backyard = [];
        const pets = [];

        for (let i = 0; i < data.length; i++) {
          switch (data[i].tag) {
            case 'home':
              home.push(data[i]);
              continue;
            case 'living room':
              livingRoom.push(data[i]);
              continue;
            case 'kitchen':
              kitchen.push(data[i]);
              continue;
            case 'bedroom':
              bedroom.push(data[i]);
              continue;
            case 'bathroom':
              bathroom.push(data[i]);
              continue;
            case 'interior':
              interior.push(data[i]);
              continue;
            case 'other':
              other.push(data[i]);
              continue;
            case 'backyard':
              backyard.push(data[i]);
              continue;
            case 'pets':
              pets.push(data[i]);
              continue;
          }
        }

        function randomize(arr, count) {
          const result = [];
          const copyArr = arr.slice();
          let i = 0;
          let int;

          while (i < count) {
            int = Math.floor(Math.random() * copyArr.length);
            result.push(copyArr[int]);
            copyArr.splice(int, 1);
            i++;
          }
          return result;
        }

        this.setState({
          photos: {
            home: randomize(home, 1),
            livingRoom: randomize(livingRoom, 5),
            kitchen: randomize(kitchen, 5),
            bedroom: randomize(bedroom, 4),
            bathroom: randomize(bathroom, 3),
            interior: randomize(interior, 4),
            other: randomize(other, 3),
            backyard: randomize(backyard, 3),
            pets: randomize(pets, 3),
          },
        });
      })
      .catch((error) => {
        console.log(`[Error]: ${error}`);
      });
  }

  onClick(room) {
    switch (room) {
      case 'Living room':
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 50,
        });
        break;
      case 'Kitchen':
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 1775,
        });
        break;
      case 'Bedroom':
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 3500,
        });
        break;
      case 'Bathroom':
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 4825,
        });
        break;
      case 'Interior':
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 5900,
        });
        break;
      case 'Other':
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 7225,
        });
        break;
      case 'Backyard':
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 8300,
        });
        break;
      case 'Pets':
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 9375,
        });
        break;
      default:
        this.setState({
          isHome: !this.state.isHome,
          yAxis: 0,
        });
    }
  }

  render() {
    if (this.state.isHome) {
      return (
        <Home
          callback={this.onClick}
          photos={this.state.photos}
        />
      );
    } else {
      return (
        <Photos
          isCollapsed={false}
          callback={this.onClick}
          photos={this.state.photos}
          yAxis={this.state.yAxis}
        />
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('photos'));
