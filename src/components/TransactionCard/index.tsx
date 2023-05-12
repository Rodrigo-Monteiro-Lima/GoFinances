import { View, Text } from 'react-native'
import React from 'react'
import { Container, Amount, Footer, Title, Icon, Category, CategoryName, Date } from './styles'

interface Category {
  name: string;
  icon: string;
}

export interface Transaction {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: Category;
  date: string;
}

 interface TransactionCardProps {
  data: Transaction;
}

export default function TransactionCard({data: {amount, category, date, title, type}} : TransactionCardProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>
        { type === 'negative' &&  '- '}
        {amount}
        </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>
          {date}
        </Date>
      </Footer>
    </Container>
  )
}