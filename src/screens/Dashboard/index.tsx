import React, { useCallback, useEffect, useState } from 'react'
import { LogoutButton, Title, Container, Header, Photo, User, UserGreeting, UserInfo, UserWrapper,UserName, Icon, HighlightCards, Transactions, TransactionList, LoadContainer } from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { Transaction } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import moment from 'moment'
import useAuth from '../../hooks/auth';

export interface DataListProps extends Transaction {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps,
  expensive: HighlightProps,
  total: HighlightProps
}

export default function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme();
  const { signOut, user } = useAuth();
  const { name, photo, id } = user;
  const [highlightData, setHighlightData] = useState<HighlightData>({
    entries: {
      amount: 'R$ 0,00',
      lastTransaction: ''
    },
    expensive: {
      amount: 'R$ 0,00',
      lastTransaction: ''
    },
    total: {
      amount: 'R$ 0,00',
      lastTransaction: ''
    }
  })
  function getLastTransactionDate(collection: DataListProps[], type: 'up' | 'down') {
    const lastTransaction = new Date(Math.max.apply(Math, collection.filter((item) => item.type === type).map((item) => new Date(item.date).getTime())))
    return moment(new Date(lastTransaction)).format('DD [de] MMMM')
  }
  async function loadData() {
    const dataKey = `@gofinances:transactions_user:${id}`;
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []
    let entriesTotal = 0
    let expensiveTotal = 0
    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if(item.type === 'up') {
        entriesTotal += Number(item.amount)
      } else {
        expensiveTotal += Number(item.amount)
      }
      const amount = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(item.amount);  
      const date = new Date(item.date)
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      const formattedDate = `${day}/${month}/${year}`;
      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date: formattedDate
      }
    })
    setData(transactionsFormatted)
    const lastTransactionEntries = getLastTransactionDate(transactions, 'up');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'down');
    setHighlightData({
      entries: {
        amount: `R$ ${Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(entriesTotal)}`,
        lastTransaction: transactions.filter((item: DataListProps) => item.type === 'up').length > 0 ? `Última entrada dia ${lastTransactionEntries}` : 'Não há transações' 
      },
      expensive: {
        amount:`R$ ${Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(expensiveTotal)}`,
        lastTransaction: transactions.filter((item: DataListProps) => item.type === 'down').length > 0 ? `Última saída dia ${lastTransactionExpensives}` : 'Não há transações'
      },
      total: {
        amount: `R$ ${Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(entriesTotal - expensiveTotal)}`,
        lastTransaction: transactions.length > 0 ? `01 à ${moment(new Date(transactions[transactions.length - 1].date)).format('DD [de] MMMM')}` : 'Não há transações'
      },
    });
    setIsLoading(false);
  }
  useFocusEffect(useCallback(() => {
    loadData()
  }, []))
    return (
      <Container>
        {isLoading ? <LoadContainer><ActivityIndicator color={theme.colors.primary} size="large"/></LoadContainer> : 
        <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: photo }} /> 
              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>{name}</UserName>
              </User>
            </UserInfo>
          </UserWrapper>
            <LogoutButton onPress={signOut}>
              <Icon name="power" />
            </LogoutButton>
        </Header>
        <HighlightCards>
          <HighlightCard 
            type="up"
            title="Entradas"
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
          />
          <HighlightCard 
            type="down"
            title="Saídas"
            amount={highlightData.expensive.amount}
            lastTransaction={highlightData.expensive.lastTransaction}
          />
          <HighlightCard 
            type="total"
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
          />
        </HighlightCards>
        <Transactions>
          <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item} />}
        />
        </Transactions>
        </>
        }
      </Container>
    )
}