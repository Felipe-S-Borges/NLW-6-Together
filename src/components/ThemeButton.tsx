import '../styles/themeButton.scss';

type ThemeButtonProps ={
    theme: () => void;
}
export function ThemeButton(props:ThemeButtonProps){
    return(
        <div className="theme-button">
        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={props.theme}/>
        <label htmlFor="toggle" className="toggle--label" >
            <span className="toggle--label-background"></span>
        </label>
        <div className="backGround"></div>
        
        </div>
    );
    //<button className="theme-button" onClick={props.theme} >theme</button>
}