import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 16px;
  /* padding: 18px 16px; */
`;

export const ImageContainer = styled.View`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text_dark};
`;