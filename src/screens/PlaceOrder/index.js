import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListRedux from '../../Components/ListRedux';
import { CustomHeader } from '../../navigation/CustomHeader';
import Database from '../../Database';
import OrderConfirmCard from '../../Components/OrderConfirmCard';
import { Alert, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { updateOrderList } from '../../store/actions/userAction';
import { StackActions } from '@react-navigation/core';
const index = (props) => {

  const { params: { response } = {} } = useRoute();
  console.log('storedData', props.orderData.userReducer.order);

  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const db = new Database();

  const [data, setData] = useState();
  const [listData, setListData] = useState(props.orderData.userReducer.order);

  const getProduct = () => {
    let product = [];
    db.productById(response.rawData).then((data) => {
      product = data;
      setData(product);
    }).catch((err) => {
      console.log(err);

    })
  }

  useEffect(() => {
    response ? getProduct() : null;
  }, []);

  useEffect(() => { }, [data]);
  useEffect(() => { }, [listData]);

  const onConfirm = (data) => {
    //customer..???
    if (!data.unitsOrdered || data.unitsOrdered < 1) {
      Alert.alert('Minimum Qunatity should be 1');
    }
    else {
      Alert.alert("Added.. Status: " + data.status + ' Total Bill: ' + data.totalPrice + ' Total Qty: ' + data.unitsOrdered);
      dispatch(updateOrderList(data));
      setData(null);
      setListData('something');
    }

  }
  const addOrderToDb = () => {
    console.log('addd', props.orderData.userReducer.order);
    //add data to db
    //inventory update as order qty subtract from inventory stock
    dispatch(updateOrderList());
    setListData(null);
    props.navigation.dispatch(StackActions.popToTop('Order Place'));
    navigate('OderList');
  
    //here navigate to list orderListComponent;
  }

  return (
    <>
      <CustomHeader title="Place Order" backIcon />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {
          data ?
            <OrderConfirmCard data={data} onConfirm={onConfirm} />
            : null
        }

        {
          listData ? <ListRedux data={props.orderData.userReducer.order} addOrderToDb={addOrderToDb} /> : null
        }
      </View>
    </>
  )
};

function mapStateToProps(order) {
  return {
    orderData: order
  }
}

export default connect(mapStateToProps)(index);
