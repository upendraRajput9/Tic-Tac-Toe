
function Square(props){
    return(
        <div  onClick={()=>props.handleClick(props.index)} className={props.class}>
            <h3>{props.name}</h3>
        </div>
    )
}

export default Square