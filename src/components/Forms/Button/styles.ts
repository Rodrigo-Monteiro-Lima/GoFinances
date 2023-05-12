import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  padding: 16px 18px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
`;