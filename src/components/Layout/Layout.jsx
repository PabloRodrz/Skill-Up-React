import Navbar from "../Navbar/Navbar";
import Title from "../title/Title"
import styled from './Layout/Layout.module.css'

const Layout = ({page, children}) => {
  return (
    <div className={ styled.layout }>
      <Navbar />
      <div className={ styled.pageContainer }>
      <Title text={page}/>
      <div className={ styled.cardsContainer}>
      {children}
      </div>
      </div>
    </div>
  );
};

export default Layout;
