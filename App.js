import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator,TextInput,TouchableOpacity } from 'react-native'
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'
// import SearchBox from './components/SearchBox'
import { colors } from './utils/index'
import { FontAwesome5 } from '@expo/vector-icons'

// import { WEATHER_API_KEY } from 'react-native-dotenv'

const WEATHER_API_KEY = '4e22a4b4475118e67d640a3b2d20c8fb'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

const LANGUAGE = 'TH'

export default function App() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitsSystem, setUnitsSystem] = useState('metric')

    const [text, setText] = useState(null)


    useEffect(() => {
        load()
    }, [])

    async function load() {
        setCurrentWeather(null)
        setErrorMessage(null)
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to run the app')
                return
            }
            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords

            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&lang=${LANGUAGE}&appid=${WEATHER_API_KEY}`

            const response = await fetch(weatherUrl)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    async function doSearch() {

        try {
            const weatherUrl = `${BASE_WEATHER_URL}q=${text}&units=${unitsSystem}&lang=${LANGUAGE}&appid=${WEATHER_API_KEY}`
            const response = await fetch(weatherUrl)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
            

    }

    if (currentWeather) {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.searchBoxView}> 
                    <TextInput style={styles.searchBox} 
                        placeholder='ค้นหา'
                        placeholderTextClor={colors.BORDER_COLOR}
                        onChangeText={setText}
                        value={text}
                    />
                    <TouchableOpacity style={styles.buttonTouch} onPress={()=>doSearch()}>
                        <FontAwesome5 name="search" size={20} color={colors.PRIMARY_COLOR} />
                    </TouchableOpacity>
                    </View>
                <View style={styles.main}>
                    {/* <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={set
                        UnitsSystem} /> */}
                    {/* <ReloadIcon load={load} /> */}
                    <WeatherInfo currentWeather={currentWeather} />
                </View>
                <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
            </View>
        )
    } else if (errorMessage) {
        return (
            <View style={styles.container}>
                <ReloadIcon load={load} />
                <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
                <StatusBar style="auto" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    main: {
        justifyContent: 'center',
        flex: 1,
    },
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
