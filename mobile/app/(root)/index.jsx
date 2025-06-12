import { View, Text, Image } from 'react-native'
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo"
import SignedOutButton from '@/components/SignOutButton'
import { Link } from 'expo-router'
import { useTransactions } from '../../hooks/useTransactions.js'
import { useEffect } from 'react';
import PageLoader from '@/components/PageLoader'
import { styles } from '../../assets/styles/styles.js'
const IndexPage = () => {
    const { user } = useUser();
    const { transactions, summary, loadData, deleteTransaction, isLoading } = useTransactions(user?.id);
    useEffect(() => {
        loadData()
    }, [loadData]);

    if (isLoading) {
        return <PageLoader />
    };



    return (
        <View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image source={require("../../assets/images/logo.png")}
                            style={styles.headerLogo}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome,</Text>
                        <Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
                    </View>
                </View>
                <View>
                    
                </View>
            </View>

        </View>
    )
}

export default IndexPage