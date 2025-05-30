
function OtherComponent({prop}){
    return (
        <div>
            <h1>This is "OtherComponent"</h1>
            <h2>This is message from App component send through index.js: <span style={{color: 'red'}}>{prop}</span></h2>
        </div>
    );
}
export default OtherComponent;