import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {setupStore} from "./redux/store";
import {Provider} from 'react-redux';
import DefaultModal from "./components/DefaultModal";
import {Provider as PaperProvider} from 'react-native-paper'
import FilterModal from "./components/FilterModal";
const store = setupStore();
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <PaperProvider>
            <DefaultModal/>
            <FilterModal/>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </PaperProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
