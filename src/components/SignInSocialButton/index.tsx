import { TouchableOpacityProps } from 'react-native'
import React from 'react'
import { SvgProps } from 'react-native-svg';
import { Button, ImageContainer, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export default function SignInSocialButton({title, svg: Svg, ...rest} : Props) {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>  
    </Button>
  )
}