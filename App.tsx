import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';
import AuthProvider from './src/context/AuthContenxt';
import Routes from './src/routes';
import useAuth from './src/hooks/auth';

export default function App() {
  const { userStorageLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });
  if(!fontsLoaded || userStorageLoading){
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}> 
      <StatusBar barStyle="light-content"/>
      <AuthProvider>
        <Routes />
      </AuthProvider>        
    </ThemeProvider>
  );
}

