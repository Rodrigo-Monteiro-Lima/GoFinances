import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(113)}px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin: 7px 0;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const InputIcon = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.background};
`;

export const InputText = styled.TextInput`
  flex: 1;
  padding: 16px 18px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const InputPasswordIcon = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.background};
`;

export const InputPasswordIconImage = styled.Image`
  width: 24px;
  height: 18px; 
`;  

// export const InputPasswordIconImageContainer = styled.View`
//   width: 24px;
//   height: 18px;
// `;  

// export const InputPasswordIconImageContainerTouchable = styled.TouchableOpacity`
//   width: 24px;
//   height: 18px;
// `;  

// export const InputPasswordIconImageContainerTouchableIcon = styled.Image`
//   width: 24px;  
//   height: 18px;
// `;

// export const InputPasswordIconImageContainerTouchableIconImage = styled.Image`
//   width: 24px;
//   height: 18px;
// `;  

// export const InputPasswordIconImageContainerTouchableIconImageTouchable = styled.TouchableOpacity`  
//   width: 24px;
//   height: 18px;
// `;  

