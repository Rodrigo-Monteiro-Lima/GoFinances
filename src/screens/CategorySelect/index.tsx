import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Footer, Container, Header, Title, Category, Icon, Name, Separator } from './styles'
import { categories } from '../../utils/categories';
import Button from '../../components/Forms/Button';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;

}

export default function CategorySelect({category, setCategory, closeSelectCategory} : Props) {
  function handleCategorySelect(category: Category) {
    setCategory(category)
  }
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{flex: 1, width: '100%'}}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon}/>
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator/>}
      />
      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory}/>
      </Footer>
    </Container>
  )
}