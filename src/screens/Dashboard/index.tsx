import React from 'react'
import { Title, Container, Header, Photo, User, UserGreeting, UserInfo, UserWrapper,UserName, Icon, HighlightCards, Transactions, TransactionList } from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { Transaction } from '../../components/TransactionCard';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';


export interface DataListProps extends Transaction {
  id: string;
}

export default function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "10/04/2020"
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: "10/04/2020"
    }
  ]
    return (
      <Container>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/108936962?v=4' }} /> 
              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>Rodrigo</UserName>
              </User>
            </UserInfo>
          </UserWrapper>
          <Icon name="power" />
        </Header>
        <HighlightCards>
          <HighlightCard 
            type="up"
            title="Entradas"
            amount="R$ 17.400,00"
            lastTransaction="Última entrada dia 13 de abril"
          />
          <HighlightCard 
            type="down"
            title="Saídas"
            amount="R$ 1.259,00"
            lastTransaction="Última saída dia 03 de abril"
          />
          <HighlightCard 
            type="total"
            title="Total"
            amount="R$ 16.141,00"
            lastTransaction="01 à 16 de abril"
          />
        </HighlightCards>
        <Transactions>
          <Title>Listagem</Title>
        {/* <TransactionList
          data={data as DataListProps[]}
          keyExtractor={(item: DataListProps) => item.id}
          renderItem={({item}) => <TransactionCard data={item as DataListProps} />}
        /> */}
        <FlatList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{  paddingBottom: getBottomSpace() }}  
        />
        </Transactions>

      </Container>
    )
}