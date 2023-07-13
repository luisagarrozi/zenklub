import "./App.css";
import Professionals from "./components/Professionals/Professionals";

function App() {
  return (
    <>
      <header className="static_page_header">
        <nav className="navbar">
          <div className="navbar_left">
            <img src="https://zenklub.com.br/assets/img/landing/svg/zenklub_full_logo_white.svg" alt="zenklub logo" className="navbar_logo" />
          </div>
          <div className="navbar_right">
            <button className="navbar_activate">Ativar benefício</button>
            <button className="navbar_login">Entrar</button>
          </div>
        </nav>
      </header>
      <div className="App">
        <Professionals />
      </div>
    </>
  );
}

export default App;
