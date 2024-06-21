import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Should have minimum 4 characters")
    .max(22, "Maximum of 22 characters allowed")
    .required("Length Required")
});

export default function App() {
  const [Password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength) => {
    let charactersList = '' ;
    const uppercasechars = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ' ;
    const lowercasechars = ' abcdefghijklmnopqrstuvwxyz' ;
    const digitschars = '0123456789';
    const specialchars = '!@#$%^&*()_-=+{}[]<>,./?|';

    if (uppercase) {
      charactersList += uppercasechars;
    }
    if (lowercase) {
      charactersList += lowercasechars;
    }
    if (numbers) {
      charactersList += digitschars;
    }
    if (symbols) {
      charactersList += specialchars;
    }

    const passwordresult = createPassword(charactersList, passwordLength);
    setPassword(passwordresult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * (characters.length - 1));
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <View style={styles.container}>
      <Svg style={styles.gradientBackground}>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#FFD700" />
          <Stop offset="100%" stopColor="#FF8C00" />
        </LinearGradient>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#grad)"
        />
      </Svg>

      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.appContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Password Generator</Text>
            <Formik
              initialValues={{ passwordLength: ' ' }}
              validationSchema={passwordSchema}
              onSubmit={(values) => { generatePasswordString(Number(values.passwordLength)) }}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Example: 8"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.checkboxWrapper}>
                    <Text style={styles.checkboxLabel}>Include Lower Case</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowercase}
                      onPress={() => setLowercase(!lowercase)}
                      fillColor="#FFD700"
                    />
                  </View>

                  <View style={styles.checkboxWrapper}>
                    <Text style={styles.checkboxLabel}>Include Upper Case</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={uppercase}
                      onPress={() => setUppercase(!uppercase)}
                      fillColor="#FFD700"
                    />
                  </View>

                  <View style={styles.checkboxWrapper}>
                    <Text style={styles.checkboxLabel}>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#FFD700"
                    />
                  </View>

                  <View style={styles.checkboxWrapper}>
                    <Text style={styles.checkboxLabel}>Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#FFD700"
                    />
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity disabled={!isValid} style={styles.primaryBtn} onPress={handleSubmit}><Text style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryBtn} onPress={() => { handleReset(); resetPasswordState() }}>
                      <Text style={styles.secondaryBtnTxt}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>

          {isPasswordGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Result: </Text>
              <Text style={styles.description}>You can copy this too...</Text>
              <Text selectable style={styles.generatedPassword}>{Password}</Text>
            </View>
          ) : null}

        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  appContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  formContainer: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#555555',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#F6F6F6',
    fontSize: 16,
    color: '#333333',
  },
  errorText: {
    fontSize: 12,
    color: '#FF0000',
    marginTop: 4,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  primaryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor: '#333333',
  },
  primaryBtnTxt: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor: '#CCCCCC',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
  },
  card: {
    borderRadius: 20,
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  generatedPassword: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginTop: 12,
  },
});
