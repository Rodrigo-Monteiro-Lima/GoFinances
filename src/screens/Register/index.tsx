import React from 'react'
import { Container, Form, Header, Title } from './styles'
import Input from '../../components/Forms/Input'

export default function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Input placeholder="Nome" />
        <Input placeholder="Preço" />
      </Form>
    </Container>
  )
}