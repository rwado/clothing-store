import styled from "styled-components"
import { BaseButton, GoogleSignInButton, InvertedButton } from "../button/button-styles"


export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 340px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  flex-grow: 1;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    font-size: 10px;
    width:100%;
    margin: 0;
  }

`

export const CartDropdownItemsContainer = styled.div`
  height: 77%;
  overflow-y: auto;
  
`

export const CartSummaryContainer = styled.div`
  position: absolute;
  width: 318px;
  bottom: 10px;
`

export const EmptyMessage = styled.span`
  display: table;
  font-size: 22px;
  margin: 20% auto;
`

export const TotalPriceContainer = styled.div`
  margin: 3px 0px;
`



 
