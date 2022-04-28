import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSetHeaders = async (token: string, key?: string): Promise<void> => {
    if (key) await AsyncStorage.setItem(key, token);
    setContext(() => ({
        headers: {
            Authorization: token
        }
    }))
    return;
}