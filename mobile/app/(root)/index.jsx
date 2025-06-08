import { View, Text } from 'react-native'
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo"
import SignedOutButton from '@/components/SignOutButton'
import { Link } from 'expo-router'
const IndexPage = () => {
    const { user } = useUser()
    return (
        <View>

             <SignedIn>
                <Text>hello, {user?.emailAddresses[0]?.emailAddress || "user"}</Text>
                <SignedOutButton />
            </SignedIn>
            <SignedOut>
                <Link href="/(auth)/sign-in">

                    <Text>Sign in</Text>
                </Link>

                <Link href="/(auth)/sign-up">

                    <Text>Sign up</Text>
                </Link>
            </SignedOut>
        </View>
    )
}

export default IndexPage