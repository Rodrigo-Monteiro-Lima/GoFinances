import React, { useState } from 'react'
import { Container, Fields, Form, Header, Title, TransactionsTypes } from './styles'
import Input from '../../components/Forms/Input'
import Button from '../../components/Forms/Button'
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton'
import CategorySelectButton from '../../components/Forms/CategorySelectButton'
import { Modal } from 'react-native'
import CategorySelect from '../CategorySelect'

export default function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [transactionType, setTransactionType] = useState('')
  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeButton 
              title="Income"
              type="up"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>
        </Fields>
        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}