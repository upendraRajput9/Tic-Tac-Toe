import { Component } from "react";
import Square from "./Square";

export default class PlatForm extends Component{
    constructor(props){
        super()
        this.state={
            cards:Array(9).fill(""),
            chance:true,
            PlayOne:true,
            start:true
        }
    }
    handleClick=(index)=>{
        let {cards}=this.state
        cards[index]=this.state.chance?"X":"O";
        this.setState(prevState=>({
      chance:!prevState.chance
        }))
     
    }

    componentDidUpdate(){
        let winner = this.winner();
        if(winner){
            setTimeout(()=>{alert(winner)
                this.setState({
                    cards:Array(9).fill(null),
                })
            },500)
        }
    }

    winner=()=>{
        let {cards} =this.state
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
    }
    render(){
        let {cards}=this.state
        return(
            <>
            <header>
                <h1>TIC TAC TOE</h1>
                <hr/>
                <h2> TURN "{this.state.chance?"X":"O"}"</h2>
            </header>
            <main className="container">
                <section>
                 <div className="plate">
                 <Square class="box0 card" handleClick={this.handleClick} index={0} key={0} name={cards[0]}/>
                 <Square class="box1 card" handleClick={this.handleClick} index={1} key={1} name={cards[1]}/>
                 <Square class="box2 card" handleClick={this.handleClick} index={2} key={2} name={cards[2]}/>
                 </div>
                 <div className="plate">
                 <Square class="box3 card" handleClick={this.handleClick} index={3} key={3} name={cards[3]}/>
                 <Square class="box4 card" handleClick={this.handleClick} index={4} key={4} name={cards[4]}/>
                 <Square class="box5 card" handleClick={this.handleClick} index={5} key={5} name={cards[5]}/>
                 </div>
                 <div className="plate">
                 <Square class="box6 card" handleClick={this.handleClick} index={6} key={6} name={cards[6]}/>
                 <Square class="box7 card" handleClick={this.handleClick} index={7} key={7} name={cards[7]}/>
                 <Square class="box8 card" handleClick={this.handleClick} index={8} key={8} name={cards[8]}/>
                 </div>
                </section>
                <button onClick={()=> this.setState({
                cards:Array(9).fill(null),
            })}>Reset</button>
            </main>
            </>
        )
    }
}