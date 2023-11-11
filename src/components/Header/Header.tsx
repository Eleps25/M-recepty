import {Link} from "react-router-dom"

const Header: React.FC = () => {
  return (
<header>
    <Link to="/">Home</Link>
    <Link to="/recipelist">Seznam Receptů</Link>
</header>
  );
};

export default Header;
