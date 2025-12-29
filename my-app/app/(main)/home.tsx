import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-emerald-600 px-4 pt-2 mb-3 w-100 h-5">
        <View className=''>
          <View className=''>
            <Text>Delivery To</Text>
          </View>
           
        </View>

        <View className=''>

        </View>
      </View>
      <ScrollView>
        {/* content goes here */}
      </ScrollView>

      
    </SafeAreaView>
  )
}

export default Home
