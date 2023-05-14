import React, { useCallback, useEffect, useState } from 'react'
import { LoadContainer, Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month } from './styles'
import HistoryCard from '../../components/HistoryCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useAuth from '../../hooks/auth';

interface TransactionData {
  type: 'up' | 'down';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export default function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const theme = useTheme();
  const { user } = useAuth();
  const { id } = user;
  function handleDateChange(action: 'next' | 'prev') {
    setIsLoading(true)
    if(action === 'next') {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }
  async function loadData(){
    setIsLoading(true)
    const dataKey = `@gofinances:transactions_user:${id}`
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []
    const expensive = transactions.filter((expensive: TransactionData) => expensive.type === 'down' && new Date(expensive.date).getMonth() === selectedDate.getMonth() && new Date(expensive.date).getFullYear() === selectedDate.getFullYear())
    const expensiveTotal = expensive.reduce((accumulator: number, expensive: TransactionData) => {
      return accumulator + Number(expensive.amount)
    }, 0)
    const totalByCategory: CategoryData[] = []
    categories.forEach(category => {
      let categorySum = 0
      expensive.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      });
      if(categorySum > 0) {
        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`
        totalByCategory.push({
          name: category.name,
          key: category.key,
          color: category.color,
          total: categorySum,
          percent,
          totalFormatted: `R$ ${categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}`
        })
      }
    })
    setTotalByCategory(totalByCategory)
    setIsLoading(false)
  }
  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))
  return (
    <Container>
      <Header>
        <Title>Resumo por catergoria</Title>
      </Header>
      {
        isLoading ? 
        <LoadContainer><ActivityIndicator color={theme.colors.primary} size='large'/></LoadContainer> : 
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight()
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left"/>
              </MonthSelectButton>
              <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>
              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right"/>
              </MonthSelectButton>
            </MonthSelect>
      
            <ChartContainer>
              <VictoryPie
                data={totalByCategory}
                colorScale={totalByCategory.map(item => item.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                labelRadius={50}
                x="percent"
                y="total"
              />
            </ChartContainer>
            {
              totalByCategory.map(item => (
                <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color}/>
              ))
            }
          </Content>
        </>
      }
    </Container>
  )
}