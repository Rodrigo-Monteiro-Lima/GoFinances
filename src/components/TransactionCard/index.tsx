import { View, Text } from 'react-native'
import React from 'react'
import { Container, Amount, Footer, Title, Icon, Category, CategoryName, Date } from './styles'
import { categories } from '../../utils/categories';

export interface Transaction {
  type: 'up' | 'down';
  name: string;
  amount: number;
  category: string;
  date: string;
}

 interface TransactionCardProps {
  data: Transaction;
}

export default function TransactionCard({data: {amount, category, date, name, type}} : TransactionCardProps) {
  const [categoryIcon] = categories.filter(item => item.key === category)
  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        { type === 'down' &&  '- '}
        R$ {amount}
        </Amount>
      <Footer>
        <Category>
          <Icon name={categoryIcon.icon} />
          <CategoryName>{categoryIcon.name}</CategoryName>
        </Category>
        <Date>
          {date}
        </Date>
      </Footer>
    </Container>
  )
}