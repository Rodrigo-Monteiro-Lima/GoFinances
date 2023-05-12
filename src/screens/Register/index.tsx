import React, { useState } from 'react'
import { Container, Fields, Form, Header, Title, TransactionsTypes } from './styles'
import Button from '../../components/Forms/Button'
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton'
import CategorySelectButton from '../../components/Forms/CategorySelectButton'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import CategorySelect from '../CategorySelect'
import InputForm from '../../components/Forms/InputForm'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

export default function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [transactionType, setTransactionType] = useState('')
  const { control, handleSubmit, formState: {errors} } = useForm({ resolver: yupResolver(schema)})
  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }
  function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Valor inválido','Selecione o tipo da transação')
    if (category.key === 'category')
      return Alert.alert('Valor inválido','Selecione a categoria')
    
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }
  return (
    <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm 
            control={control} 
            name='name' 
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message as string}
            />
            <InputForm 
            control={control} 
            name='amount' 
            placeholder="Preço"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message as string}
            />
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
          <Button title="Enviar" 
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}