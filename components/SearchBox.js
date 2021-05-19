import React, {useState} from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../utils/index'


export default function SearchBox() {

const [text, setText] = useState(null)

    return (
        <View style={styles.searchBoxView}> 
          <TextInput style={styles.searchBox} 
            placeholder='ค้นหา'
            placeholderTextClor={colors.BORDER_COLOR}
            onChangeText={setText}
            value={text}
          />
          <TouchableOpacity style={styles.buttonTouch} >
              <FontAwesome5 name="search" size={20} color={colors.PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBoxView : {
      height: "6%",
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: '15%'
    },
    searchBox: {
      height: '100%',
      width: '80%',
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 15,
  },
  buttonTouch : {
    marginLeft: '5%',
    height: '35%',
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
