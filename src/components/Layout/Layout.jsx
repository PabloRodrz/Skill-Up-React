import Navbar from "../Navbar/Navbar";
import Title from "../title/Title"
import "./Layout.css";

const Layout = ({page, children}) => {
  return (
    <div className="Layout">
      <Navbar />
      <div className="pageContainer">
      <Title text={page}/>
      <div className="cardsContainer">
      {children}
      </div>
      </div>
    </div>
  );
};

export default Layout;
