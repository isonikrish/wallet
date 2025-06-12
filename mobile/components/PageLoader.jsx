import { View, ActivityIndicator } from 'react-native'
import { coffeeTheme, styles } from '../assets/styles/styles'

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={coffeeTheme.primary}/>
    </View>
  )
}

export default PageLoader;