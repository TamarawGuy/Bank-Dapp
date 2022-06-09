import { useState } from "react";
import styled from "styled-components";

import Modal from "./Modal";
import Dashboard from "./Dashboard";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;

const ModalContainer = styled.div``;

const DashboardContainer = styled.div``;

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => setShowModal(!showModal);

  return (
    <Container>
      <ModalContainer style={{ display: showModal ? "block" : "none" }}>
        <Modal toggleShowModal={toggleShowModal} />
      </ModalContainer>
      <DashboardContainer style={{ display: showModal ? "none" : "block" }}>
        <Dashboard toggleShowModal={toggleShowModal} />
      </DashboardContainer>
    </Container>
  );
};

export default App;
