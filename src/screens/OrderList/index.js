import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import Item from '../../components/Item'
import Card from '../../components/Card'

const index = () => {

  const { params: { response } = {} } = useRoute();
  console.log(response);
  const { navigate } = useNavigation();

  // const [date, setDate] = useState('');

  // const currDate = () => {
  //   currentDate = new Date();
  //   display = currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear();
  //   setDate(display);
  // }
  const itemDetails = ({ item, response }) => {
    if (item.id == response.rawData) {
      return (<View>
        <Text style={styles.text}>{response.rawData}</Text>
        <Text style={styles.text}>{item.stock}</Text>
      </View>
      );
    }
  };


  return (
    <View style={styles.base}>
      <View style={styles.scan}>
        <Button title='Scan item' onPress={() => navigate("Scanner")} />
      </View>
      <Card>
        <View style={styles.alignRow}>
          <Text style={styles.text}>Item Name</Text>
          <Text style={styles.text}>00 Inv</Text>
          <TextInput style={styles.input} placeholder="No.Ordered" />
        </View>
        <TextInput value={Date().toString().substring(0, 10)} style={styles.text} />
        <View style={styles.button}>
          <Button title="Confirm" onPress={() => console.log('pressed')} />
        </View>
      </Card>
      <Item />
    </View>
  )
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: 'white'
  },
  scan: {
    width: '30%',
    marginHorizontal: '35%',
    marginVertical: '5%'
  },
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    width: '100%'
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 10,
    width: 40,
    lineHeight: 15,
    height: 35,
    fontSize: 15,
    paddingVertical: 0,
    paddingHorizontal: 7
  },
  text: {
    fontSize: 20,
    color: 'black'
  }
});

export default index;