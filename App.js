import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// --- 1. STACK NAVIGATOR SCREENS (Demonstrating Parameter Passing) ---

function ProductListScreen({ navigation }) {
  const sampleProducts = [
    { id: '1', name: 'Wireless Headphones', price: '$99.99', description: 'High quality noise-canceling headphones.' },
    { id: '2', name: 'Smart Watch', price: '$149.99', description: 'Track your health and notifications on the go.' },
    { id: '3', name: 'Portable Charger', price: '$39.99', description: '10000mAh fast-charging power bank.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Catalog</Text>
      <Text style={styles.subtitle}>Tap a product to view details (Passing Parameters)</Text>
      <FlatList
        data={sampleProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { 
              productId: item.id, 
              productName: item.name, 
              productPrice: item.price,
              productDesc: item.description 
            })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function ProductDetailScreen({ route, navigation }) {
  const { productId, productName, productPrice, productDesc } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.detailBox}>
        <Text style={styles.title}>{productName}</Text>
        <Text style={styles.detailText}>ID: {productId}</Text>
        <Text style={styles.detailText}>Price: {productPrice}</Text>
        <Text style={styles.detailText}>Description: {productDesc}</Text>
      </View>
      <Button title="Back to Products" onPress={() => navigation.goBack()} color="#2b8a3e" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function ShopStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#2b8a3e' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Shop' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
    </Stack.Navigator>
  );
}

// --- 2. BOTTOM TAB NAVIGATOR SCREENS ---

function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Feed</Text>
      <Text style={styles.subtitle}>Discover trending items and daily deals here.</Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>You have no new notifications.</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ShopTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2b8a3e',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="ShopTab" component={ShopStack} options={{ title: 'Shop' }} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

// --- 3. DRAWER NAVIGATOR (Side Menu) SCREENS ---

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.subtitle}>Username: JohnDoe_99</Text>
      <Text style={styles.subtitle}>Email: john.doe@example.com</Text>
      <Button title="Open Side Menu" onPress={() => navigation.openDrawer()} color="#2b8a3e" />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Manage your app preferences and dark mode.</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        screenOptions={{ 
          drawerActiveTintColor: '#2b8a3e',
          headerStyle: { backgroundColor: '#2b8a3e' },
          headerTintColor: '#fff'
        }}
      >
        <Drawer.Screen name="HomeTabs" component={MainTabs} options={{ title: 'Home & Tabs' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// --- STYLESHEET ---

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#222' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, width: 280, marginVertical: 6, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardPrice: { fontSize: 14, color: '#2b8a3e', marginTop: 4 },
  detailBox: { backgroundColor: '#fff', padding: 20, borderRadius: 8, width: '100%', marginBottom: 20, elevation: 3 },
  detailText: { fontSize: 16, marginVertical: 4, color: '#333' },
});