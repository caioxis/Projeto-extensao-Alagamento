import { NavigationContainer } from '@react-navigation/native';
import Navogation from './src/navigation/Navigation.js';
import { ReportsProvider } from './src/context/ReportsContext';

export default function App() {
  return (
    <ReportsProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ReportsProvider>
  );
}
