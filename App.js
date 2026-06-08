import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
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
