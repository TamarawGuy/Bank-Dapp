import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-width: 35%;
  min-height: 30%;
  background-color: #eeeeee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TokenLine = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TokenTitle = styled.span`
  font-weight: bold;
`;

const TokenNum = styled.span`
  font-size: 20px;
  color: #808080;
`;

const DepositWithdrawBtn = styled.button`
  padding: 8px 10px;
  background-color: navy;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Dashboard = ({ setSelectedSymbol, tokenBalances, toggleShowModal }) => {
  const tokens = Object.keys(tokenBalances);
  return (
    <Container>
      <Wrapper>
        {tokens.map((token, index) => (
          <TokenLine key={index}>
            <TokenTitle>{token}</TokenTitle>
            <TokenNum>{tokenBalances[token]}</TokenNum>
            <DepositWithdrawBtn
              onClick={() => {
                toggleShowModal();
                setSelectedSymbol(token);
              }}
            >
              Deposit / Withdraw
            </DepositWithdrawBtn>
          </TokenLine>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
