import { View, Text, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { Container, Title, Icon } from './styles'

interface Props extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export default function TransactionTypeButton({title, type, isActive, ...rest} : Props) {
  const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
  }
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type}/>
      <Title>
        {title}
      </Title>
    </Container>
  )
}