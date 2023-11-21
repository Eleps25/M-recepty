import "./style.css";

const Footer: React.FC = () => {
  return <footer className="footer-container">
    <div className="footer-copyright">©2023</div>
    <a href="https://github.com/Eleps25" className="footer-created-by">Created by <span className="footer-created-by-myName">Jakub Mezuláník</span></a>
  </footer>;
};

export default Footer;
