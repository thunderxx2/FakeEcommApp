import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RootStackParamList } from "../../../navigation/types";
import { COLORS, GlobalStyles, SIZES } from "../../../shared/utils/GlobalStyles";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const MOCK_OTP = '123456';

  const handleSendVerificationCode = async () => {
    try{
      setLoading(true);
      const formattedPhoneNumber = `+91${phoneNumber}`;
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', `OTP sent successfully! (Use ${MOCK_OTP})`);
      setOtpSent(true);
    } catch(error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const handleVerifyOtp = async () => {
    try{
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      if(otp === MOCK_OTP){
        navigation.replace('MainApp');
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch(error){
      Alert.alert('Error', 'Failed to verify OTP');
    } finally{
      setLoading(false);
    }
    // navigation.replace('MainApp');
  };

  const handleSentOtp = async () => {};

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.centered}>
        <Text style={GlobalStyles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {
          !otpSent ? (
            <>
              <View style={GlobalStyles.input}>
                <View style={styles.phoneInputContainer}>
                  <Text style={styles.countryCode}>+91</Text>
                  <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!loading}
                  maxLength={10}
                  />
                </View>
              </View>
              <TouchableOpacity
              style={[GlobalStyles.button, loading && GlobalStyles.buttonDisabled]}
              onPress={handleSendVerificationCode}
              disabled={loading || phoneNumber.length < 10}>
                {
                  loading ? (
                    <ActivityIndicator color={COLORS.white}/>
                  ) : (
                    <Text style={GlobalStyles.buttonText}>Send OTP</Text>
                  )
                }
              </TouchableOpacity>
            </>
          ) : (
            <>
            <View style={GlobalStyles.input}>
            <TextInput
            style={styles.otpInput}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            editable={!loading}
            maxLength={6}
          />
            </View>
            <TouchableOpacity
            style={[GlobalStyles.button, loading && GlobalStyles.buttonDisabled]}
            onPress={handleVerifyOtp}
            disabled={loading || otp.length < 6}>
              {
                loading ? (
                  <ActivityIndicator color={COLORS.white}/>
                ) : (
                  <Text style={GlobalStyles.buttonText}>Verify OTP</Text>
                )
              }
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.resendButton}
            disabled={loading}>
              <Text style={GlobalStyles.buttonText}>Resend OTP</Text>
            </TouchableOpacity>
            </>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: SIZES.base,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
  },
  countryCode: {
    fontSize: SIZES.base * 2,
    color: COLORS.dark,
    marginRight: SIZES.base,
  },
  phoneInput: {
    height: 48,
    width: '50%',
    fontSize: SIZES.base * 2,
  },
  resendButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  resendText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  otpInput: {
    height: 48,
    fontSize: SIZES.base * 2,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
  },
});