import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Table, Row, Rows, Col } from 'react-native-table-component';

const CONTENT = {
  tableHead: ['Item','Total Bill' ,'Units Sold', 'Order Completed On','SalePrice per unit','Cost per Unit'],
  //tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4'],
  tableData: [
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    ['Lays', 50, '3 March 2020', 10,8],
    
   
  ],
};

export default function index({saleRecord}) {
  return (
    <View style={{backgroundColor:'white'}}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={CONTENT.tableHead}
            widthArr={[120, 100, 100, 120,100,100]}
            style={styles.head}
            textStyle={styles.text}
          />
            <Rows
              data={saleRecord}
              widthArr={[120, 100, 100, 120,100,100]}
              style={styles.row}
              textStyle={styles.text}
            />
        
        </Table>
      </View>
     
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 20},
  head: { height: 50, backgroundColor: 'orange', },
  row: { height: 40 },
  text: { textAlign: 'center' },
});