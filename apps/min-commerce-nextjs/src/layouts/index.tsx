import Navbar from "@/components/Navbar";
import styled from "styled-components";

const HomeContainer = styled.div`
  margin: 0 auto;
  // text-align: center;
`;

const MainContent = styled.main`
  // max-width: 1280px;
  margin: 0 auto;
  padding: 0 0;
`;

function Mainlayout({ children }) {
    return (<HomeContainer>
      <Navbar />
      <MainContent>{children}</MainContent>
    </HomeContainer>);
}

export default Mainlayout;