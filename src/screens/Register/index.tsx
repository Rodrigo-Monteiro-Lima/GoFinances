import React, { useState } from 'react'
import { Container, Fields, Form, Header, Title, TransactionsTypes } from './styles'
import Button from '../../components/Forms/Button'
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton'
import CategorySelectButton from '../../components/Forms/CategorySelect'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import CategorySelect from '../CategorySelect'
import InputForm from '../../components/Forms/InputForm'
import { set, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/auth'


interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

type NavigationProps = {
  navigate:(screen:string) => void;
}

export default function Register() {
  const { user } = useAuth();
  const { id } = user;
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [transactionType, setTransactionType] = useState('')
  const { control, handleSubmit, formState: {errors}, reset } = useForm({ resolver: yupResolver(schema)})
  const navigation = useNavigation<NavigationProps>();
  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }
  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Valor inválido','Selecione o tipo da transação')
    if (category.key === 'category')
      return Alert.alert('Valor inválido','Selecione a categoria')
    
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }
    try {
      const dataKey = `@gofinances:transactions_user:${id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });
      navigation.navigate('Listagem')
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar')
    }
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