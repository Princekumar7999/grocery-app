import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
 

function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
       <View style={styles.content}>
           <Text style={styles.title}>Welcome</Text>
           <Text style={styles.subtitle}>Login or Signup to FarmFresh</Text>

           <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={()=>router.push('/(auth)/login')}>
              <Text style={styles.buttonText} >Login</Text>
             </TouchableOpacity>



           <TouchableOpacity style={[styles.button , styles.signupButton]} onPress={()=>router.push('/(auth)/signup')}>
              <Text style={styles.signupButtonText} >Sign Up</Text>
           </TouchableOpacity>

       </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: "#1E88E5",
  },
  signupButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#1E88E5",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  signupButtonText: {
    color: "#1E88E5",
  },
});