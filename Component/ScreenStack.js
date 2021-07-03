import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TakePhotoScreen from "./Takephoto";
import MisMomentosScreen from "./MisMomentos";
import MomentosScreen from "./Momentos";
import SingUpScreen from "./SingUp";
import SingInScreen from "./SingIn";
import Icon from "react-native-vector-icons/MaterialIcons";

const Stack = createBottomTabNavigator(); //Es una funcion que basicamente maneja  la conexion entre pantallas.

const ScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#7CDCC1",
        },
        headerTintColor: "black",
        headerTitleStyle: {
          textAlign: "center",
          fontWeight: "bold",
          backgroundColor: "#7CDCC1",
        },
      }}
    >
      {/* Aqui van las screens luego de importarlas, se utiliza 
            un componente de React Navigation que posee a su vez un 
            atributo donde montar el componente. 
            Ej: <Satack.Screen name="myFirstScreen" component={nombreComponente}/>
            El atributo "name" es la referencia que en todo momento se va a utilizar
            para conectar de manera tal que si se quiere ir de una pantalla a otra que no
      le sigue en el stack, pueda hacerlo. */}
      <Stack.Screen
        name="Momentos"
        component={SingInScreen}
        options={{
          tabBarLabel: "Momentos",
          tabBarIcon: () => <Icon name="home" color="#7CDCC1" size={24} />,
        }}
      />

      <Stack.Screen
        name="TomarMomentos"
        component={TakePhotoScreen}
        options={{
          tabBarLabel: "Tomar Momentos",
          tabBarIcon: () => <Icon name="camera" color="#7CDCC1" size={24} />,
        }}
      />

      <Stack.Screen
        name="MisMomentos"
        component={MisMomentosScreen}
        options={{
          tabBarLabel: "Mis Momentos",
          tabBarIcon: () => <Icon name="folder" color="#7CDCC1" size={24} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreenStack;
