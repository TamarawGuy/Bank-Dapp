import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 25%;
  height: 25%;
  background-color: #eeeeee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
`;

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Top = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const Title = styled.p`
  text-transform: uppercase;
  font-size: 30px;
`;

const Middle = styled.div`
  display: flex;
`;

const MiddleLeft = styled.div`
  flex: 1;
  text-align: center;
`;

const Amount = styled.span`
  font-size: 25px;
  margin-right: 10px;
`;

const MiddleRight = styled.div`
  flex: 2;
`;

const Input = styled.input`
  width: 91%;
  padding: 8px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const DepositBtn = styled.button`
  padding: 8px 10px;
  background-color: navy;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const WithdrawBtn = styled.button`
  padding: 8px 10px;
  background-color: navy;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Bottom = styled.div`
  /* position: relative; */
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;

  padding: 6px 10px;
  background-color: navy;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const Modal = () => {
  return (
    <Container>
      <Wrapper>
        <Top>
          <Title>Eth</Title>
        </Top>
        <Middle>
          <MiddleLeft>
            <Amount>Amount</Amount>
          </MiddleLeft>
          <MiddleRight>
            <Input></Input>
            <BtnWrapper>
              <DepositBtn>Deposit</DepositBtn>
              <WithdrawBtn>Withdraw</WithdrawBtn>
            </BtnWrapper>
          </MiddleRight>
        </Middle>
        <Bottom>
          <CloseBtn>X</CloseBtn>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Modal;
