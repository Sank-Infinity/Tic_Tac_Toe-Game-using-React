import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';


function getGameStatus(squares){

    let winCombs = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    for(let i = 0; i < winCombs.length; i++){
        let winComb = winCombs[i];
        let s1 = winComb[0];
        let s2 = winComb[1];
        let s3 = winComb[2];
        if( squares[s1] != null && squares[s1] == squares[s2] && squares[s2] == squares[s3] ){
            return squares[s1];
        }
    }

    return null;
}

class Board extends React.Component {

    handleBoxClick(i){
        this.props.handleBoxClickInfo(i);
    }

    renderBoxes(i){
        return (
            <button onClick={() => this.handleBoxClick(i) }> {this.props.boxes[i] == null ? "" : this.props.boxes[i]} </button>
        );
    }

    render(){
        return(
            <>
            <div className='board'>
                <div className='title'>
                    Tic Tac Toe
                </div>
                <div className='content'>
                    <div className='ttt'>

                        <div className='row'>
                            {this.renderBoxes(0)}
                            {this.renderBoxes(1)}
                            {this.renderBoxes(2)}
                        </div>
                        <div className='row'>
                            {this.renderBoxes(3)}
                            {this.renderBoxes(4)}
                            {this.renderBoxes(5)}
                        </div>
                        <div className='row'>
                            {this.renderBoxes(6)}
                            {this.renderBoxes(7)}
                            {this.renderBoxes(8)}
                        </div>

                    </div>
                </div>
            </div>
            </>
        );
    }
}

class Display extends React.Component {

    changeHistroy(i){
        this.props.handlerForHistory(i);
    }

    render() {

        let gameTitle = null;

        if( this.props.gameStatus==null ){
            gameTitle = "Next Move for " + (this.props.stepsNumber %2==0 ? "X"  : "O");
        }else{
            if(this.props.gameStatus == "Draw") gameTitle = "It's a draw!"
            else gameTitle = this.props.gameStatus + " Wins";
        }

        let buttons = [];

        for(let i = 0;  i <= this.props.stepsNumber; i++){
            let button = null;

            if(i==0){
                button = (<button key ={i} onClick={() => this.changeHistroy(i)}>Go to Start</button>);
            }else{
                button = (<button key ={i} onClick={() => this.changeHistroy(i)}>Go to Step #{i}</button>)
            }

            buttons.push(button);
        }

        return(
            <>
                <div className='display'>
                    <div className='title'>
                        {gameTitle}
                    </div>
                    <div className='content'>
                        <div className='history'>
                            {buttons}
                            
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class TTT extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            history : [
                [null, null, null, null, null, null, null, null, null]
            ],
            steps : 0,
            gameStatus : null
        }
    }

    handleSquareClick(i){

        let oldHistory = this.state.history.slice();
        let curSquares = oldHistory[oldHistory.length - 1].slice();

        if(curSquares[i] != null || this.state.gameStatus != null) return;

        curSquares[i] = this.state.steps % 2 == 0 ? "X" : "O";

        oldHistory.push(curSquares);
        
        let newGameStatus = getGameStatus(curSquares);

        if(this.state.steps == 8 && newGameStatus == null){
            newGameStatus = "Draw";
        }

        this.setState({
            history : oldHistory,
            steps : this.state.steps + 1,
            gameStatus: newGameStatus
        })
    }

    moveToHistory(i){
        
        let oldHistory = this.state.history.slice(0, i + 1);
        let curSquares = oldHistory[oldHistory.length - 1].slice();

        let newGameStatus = getGameStatus(curSquares);

        this.setState({
            history : oldHistory,
            steps : i,
            gameStatus: newGameStatus
        })
    }

    render(){

        let sqares = this.state.history[this.state.history.length - 1];

        return (
            <>
                <Board handleBoxClickInfo={(i) => this.handleSquareClick(i) } boxes={sqares} />
                <Display stepsNumber={this.state.steps} gameStatus={this.state.gameStatus} handlerForHistory={(i) => this.moveToHistory(i) }/>
            </>
        ) 
    }
}

ReactDOM.render( <TTT/> , document.getElementById("root")  );