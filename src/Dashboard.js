import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-width: 30%;
  min-height: 30%;
  background-color: #eeeeee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TokenLine = styled.div`
  padding-top: 17px;
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

const Dashboard = ({ toggleShowModal }) => {
  return (
    <Container>
      <Wrapper>
        <TokenLine>
          <TokenTitle>AVAX</TokenTitle>
          <TokenNum>0.00</TokenNum>
          <DepositWithdrawBtn onClick={() => toggleShowModal()}>
            Deposit/Withdraw
          </DepositWithdrawBtn>
        </TokenLine>
        <TokenLine>
          <TokenTitle>DOGE</TokenTitle>
          <TokenNum>0.00</TokenNum>
          <DepositWithdrawBtn onClick={() => toggleShowModal()}>
            Deposit/Withdraw
          </DepositWithdrawBtn>
        </TokenLine>
        <TokenLine>
          <TokenTitle>SHIB</TokenTitle>
          <TokenNum>0.00</TokenNum>
          <DepositWithdrawBtn onClick={() => toggleShowModal()}>
            Deposit/Withdraw
          </DepositWithdrawBtn>
        </TokenLine>
        <TokenLine>
          <TokenTitle>ETH</TokenTitle>
          <TokenNum>0.00</TokenNum>
          <DepositWithdrawBtn onClick={() => toggleShowModal()}>
            Deposit/Withdraw
          </DepositWithdrawBtn>
        </TokenLine>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
