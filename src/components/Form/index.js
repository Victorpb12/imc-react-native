import { 
  TextInput, 
  View, 
  Text, 
  TouchableOpacity,
  Vibration,
} from 'react-native';
import ResultImc from './ResultImc';
import { useState } from 'react';
import styles from './style';

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState('Preencha o peso a a altura');
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState('Calcular');
  const [errorMessage, setErrorMessage] = useState(null);

  function imcCalculator() {
    return setImc((weight / (height * height)).toFixed(2));
  }

  function validationImc() {
    if (weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc('Seu imc é igual: ');
      setTextButton('Calcular novamente');
      setErrorMessage(null);
      return 
    }
    verificationImc();
    setImc(null);
    setTextButton('Calcular');
    setMessageImc('Preencha o peso a a altura');
  }

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage('Campo obrigatório*');
      return;
    }
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput 
          style={styles.input}
          placeholder='Ex. 1.80' 
          keyboardType='numeric'
          onChangeText={setHeight}
          value={height}
          />
        <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput 
          style={styles.input}
          placeholder='Ex. 82.58 ' 
          keyboardType='numeric'
          onChangeText={setWeight}
          value={weight}
          />
        <TouchableOpacity 
        onPress={() => validationImc()}
        style={styles.buttonCalculator}
        >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc}/>
    </View>
  );
}