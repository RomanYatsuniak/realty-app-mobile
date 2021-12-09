/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {useSelector} from "react-redux";
import {useAppSelector} from "../redux/helpers";
import RealtyOffersScreen from "../screens/RealtyOffersScreen";
import CreatePublicationScreen from "../screens/CreatePublicationScreen";
import PublicationRentInfoScreen from "../screens/PublicationRentInfoScreen";
import PublicationSellInfoScreen from "../screens/PublicationSellInfoScreen";
import ListScreen from "../screens/ListScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import RentScreen from "../screens/RentScreen";
import BuyScreen from "../screens/BuyScreen";
import OwnerInfoScreen from "../screens/OwnerInfoScreen";
import MyNotesScreen from "../screens/MyNotesScreen";
import UserPurchasesScreen from "../screens/UserPurchasesScreen";
import HistoryOfReservationsScreen from "../screens/HistoryOfReservationsScreen";
import HistoryOfPurchasesScreen from "../screens/HistoryOfPurchasesScreen";
import CreateUserReviewScreen from "../screens/CreateUserReviewScreen";
import CreatePublicationReviewScreen from "../screens/CreatePublicationReviewScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  return (
    <Stack.Navigator>
        {
            isAuth ?
                <>
                    <Stack.Screen name="Root" component={PrivateBottomTabNavigator} options={{ headerShown: false }} />
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="PublicationRentInfoScreen" options={{ title: '' }}  component={PublicationRentInfoScreen} />
                        <Stack.Screen name="PublicationSellInfoScreen" options={{ title: '' }} component={PublicationSellInfoScreen} />
                        <Stack.Screen name="BuyScreen" options={{ title: '' }} component={BuyScreen} />
                        <Stack.Screen name="RentScreen" options={{ title: '' }} component={RentScreen} />
                        <Stack.Screen name="OwnerInfoScreen" options={{ title: '' }} component={OwnerInfoScreen} />
                        <Stack.Screen name="UserPurchasesScreen" options={{ title: '' }} component={UserPurchasesScreen} />
                        <Stack.Screen name="HistoryOfReservationsScreen" options={{ title: '' }} component={HistoryOfReservationsScreen} />
                        <Stack.Screen name="HistoryOfPurchasesScreen" options={{ title: '' }} component={HistoryOfPurchasesScreen} />
                        <Stack.Screen name="CreatePublicationReviewScreen" options={{ title: '' }} component={CreatePublicationReviewScreen} />
                        <Stack.Screen name="CreateUserReviewScreen" options={{ title: '' }} component={CreateUserReviewScreen} />
                    </Stack.Group>
                </>
                 :
                <Stack.Screen name="Root" component={PublicBottomTabNavigator} options={{ headerShown: false }} />
        }
      {/*<Stack.Screen name="Root" component={PublicBottomTabNavigator} options={{ headerShown: false }} />*/}
      {/*<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />*/}
      {/*<Stack.Group screenOptions={{ presentation: 'modal' }}>*/}
      {/*  <Stack.Screen name="Modal" component={ModalScreen} />*/}
      {/*</Stack.Group>*/}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function PublicBottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Login"
        component={TabOneScreen}
        options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Signup"
        component={TabTwoScreen}
        options={{
          title: 'SignUp',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}


function PrivateBottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="ModalScreen"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="HistoryScreen"
                component={ListScreen}
                options={{
                    title: 'Reservations',
                    tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="MyNotesScreen"
                component={MyNotesScreen}
                options={{
                    title: 'Favourites',
                    tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="RealtyOffersScreen"
                component={RealtyOffersScreen}
                options={{
                    title: 'Realty',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="CreatePublicationScreen"
                component={CreatePublicationScreen}
                options={{
                    title: 'Create Publication',
                    tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="UserInfoScreen"
                component={UserInfoScreen}
                options={{
                    title: 'User',
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />
            {/*<Stack.Screen name="PublicationRentInfoScreen" component={PublicationRentInfoScreen} options={{*/}
            {/*    tabBarVisible: false,*/}
            {/*}} />*/}
        </BottomTab.Navigator>
    )
}
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
