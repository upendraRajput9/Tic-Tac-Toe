import { Component } from 'react';
import Square from './Square';

export default class PlatForm extends Component {
  constructor(props) {
    super();
    this.state = {
      cards: Array(9).fill(null),
      chance: true,
      PlayOne: true,
      players: true,
      scoreX: 0,
      scoreO: 0,
      tieScore: 0,
    };
  }

  //handle Click for play
  handleClick = async (index, player) => {
    let { cards } = this.state;
    if (cards[index] !== 'X' && cards[index] !== 'O') {
      let unfillCard = [];
      let unfillIndex = null;
      cards[index] = this.state.chance ? 'X' : 'O';
      this.setState((prevState) => ({
        chance: !prevState.chance,
      }));
      let winner = this.winner();
      if (!player && !winner) {
        this.state.cards.forEach((elm, index) =>
          elm !== 'X' && elm !== 'O' ? unfillCard.push(index) : ''
        );
        unfillIndex = unfillCard[Math.floor(Math.random() * unfillCard.length)];

        //computer
        await setTimeout(() => {
          cards[unfillIndex] = this.state.chance ? 'X' : 'O';
          this.setState((prevState) => ({
            chance: !prevState.chance,
          }));
        }, 500);
      }
    }
  };

  handleCheck = async () => {
    let winner = this.winner();
    let forTie = this.state.cards.filter((elm) => elm !== 'X' && elm !== 'O');
    if (winner) {
      setTimeout(() => {
        this.setState({
          chance: true,
          scoreO: winner === 'O' ? this.state.scoreO + 1 : this.state.scoreO,
          scoreX: winner === 'X' ? this.state.scoreX + 1 : this.state.scoreX,
          cards: Array(9).fill(null),
        });
        alert(`😎 ${winner} Player is the Winner`);
      }, 500);
    } else if (forTie.length===0) {
        alert(`Match is tie`);
        this.setState({
            cards: Array(9).fill(null),
            chance: true,
          tieScore: this.state.tieScore + 1,
        });
    }
  };
  //Winner Function
  winner = () => {
    let { cards } = this.state;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cards[a] && cards[a] === cards[b] && cards[a] === cards[c]) {
        return cards[a];
      }
    }
    return null;
  };

  // componenetDid Update

  componentDidUpdate() {
    this.handleCheck();
  }

  //render Page
  render() {
    let { cards } = this.state;
    return (
      <>
        <header>
          <h1>TIC TAC TOE</h1>
          <hr />
        </header>
        <main className="container">
          <section>
            <div className="plate">
              <Square
                class="box0 card"
                handleClick={() => this.handleClick(0, this.state.players)}
                key={0}
                name={cards[0]}
              />
              <Square
                class="box1 card"
                handleClick={() => this.handleClick(1, this.state.players)}
                key={1}
                name={cards[1]}
              />
              <Square
                class="box2 card"
                handleClick={() => this.handleClick(2, this.state.players)}
                key={2}
                name={cards[2]}
              />
            </div>
            <div className="plate">
              <Square
                class="box3 card"
                handleClick={() => this.handleClick(3, this.state.players)}
                key={3}
                name={cards[3]}
              />
              <Square
                class="box4 card"
                handleClick={() => this.handleClick(4, this.state.players)}
                key={4}
                name={cards[4]}
              />
              <Square
                class="box5 card"
                handleClick={() => this.handleClick(5, this.state.players)}
                key={5}
                name={cards[5]}
              />
            </div>
            <div className="plate">
              <Square
                class="box6 card"
                handleClick={() => this.handleClick(6, this.state.players)}
                key={6}
                name={cards[6]}
              />
              <Square
                class="box7 card"
                handleClick={() => this.handleClick(7, this.state.players)}
                key={7}
                name={cards[7]}
              />
              <Square
                class="box8 card"
                handleClick={() => this.handleClick(8, this.state.players)}
                key={8}
                name={cards[8]}
              />
            </div>
          </section>
          <section className="btn-section">
            <article>
              <span className={this.state.chance ? 'active' : ''}>
                <h4>Player1(X)</h4>
                <h5>{this.state.scoreX}</h5>
              </span>
              <span>
                <h4>Tie</h4>
                <h5>{this.state.tieScore}</h5>
              </span>
              <span className={this.state.chance ? '' : 'active'}>
                <h4>{this.state.players ? 'Player2(O)' : 'Computer(O)'}</h4>
                <h5>{this.state.scoreO}</h5>
              </span>
            </article>
            <article>
              <button
                onClick={() =>
                  this.setState({
                    cards: Array(9).fill(null),
                    chance: true,
                    PlayOne: true,
                    players: true,
                    scoreX: 0,
                    scoreO: 0,
                    tieScore: 0,
                  })
                }
              >
                Reset
              </button>
              <button
                onClick={() =>
                  this.setState((prevState) => ({
                    players: !prevState.players,
                  }))
                }
              >
                {this.state.players ? '2Player' : '1player'}
                {this.state.players ? (
                  <i className="fa-solid fa-user-group"></i>
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </button>
            </article>
          </section>
        </main>
      </>
    );
  }
}
