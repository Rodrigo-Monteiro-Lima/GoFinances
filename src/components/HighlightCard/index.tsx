import React from 'react'
import { Container, Header,Title, Icon, Footer, Amount, LastTransaction } from './styles'

interface Props {
  type: 'up' | 'down' | 'total'
  title: string
  amount: string
  lastTransaction: string
}

interface IIcon {
  [key: string]: any;
}

export default function HighlightCard({amount, type, lastTransaction, title} : Props) {
  const icon: IIcon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
  }
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={ icon[type] } type={type}/>
      </Header>
      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  )
}