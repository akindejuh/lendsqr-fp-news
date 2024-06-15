import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsStackParamsList } from '../types';
import { newsRoutes } from '../routes';

const News = createNativeStackNavigator<NewsStackParamsList>();

function NewsStack() {
  return (
    <News.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {newsRoutes.map((screen, index) => {
        return (
          <News.Screen
            key={index}
            {...screen}
            name={screen.name}
            component={screen.component}
          />
        );
      })}
    </News.Navigator>
  );
}

export default NewsStack;
