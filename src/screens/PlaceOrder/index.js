import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListRedux from '../../Components/ListRedux';
import { CustomHeader } from '../../navigation/CustomHeader';
import Database from '../../Database';
import OrderConfirmCard from '../../Components/OrderConfirmCard';
import { Alert, Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { updateOrderList } from '../../store/actions/userAction';
import { StackActions } from '@react-navigation/core';
const index = (props) => {

  const { params: { response } = {} } = useRoute();

  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const db = new Database();

  const [data, setData] = useState();
  const [prod, setProd] = useState([]);

  const [listData, setListData] = useState(props.orderData.userReducer.order);

  const getProduct = () => {
    let product = [];
    db.productById(response.rawData).then((data) => {
      product = data;
      setData(product);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    response ? getProduct() : null;
  }, []);

  useEffect(() => { }, [data]);
  useEffect(() => { }, [listData]);

  const onConfirm = (data) => {
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

  const getProd = async (id) => {
    await db.productById(id).then((data) => {
      prod.push(data);
      setProd(data);
    }).catch((err) => {
      console.log(err);

    });
  }

  const add = async (id, unitsOrder, itemName, status, totalPrice) => {
    await getProd(id);
    var obj = Object.assign({}, prod);
    var actualstock = (obj['0'].itemStock);

    if (actualstock < unitsOrder) {
      Alert.alert('Not Sufficient Stock of ' + itemName);
    }
    else {
      var remainingitemStock = parseInt(actualstock) - parseInt(unitsOrder);
      var updateInventory = await db.updateProductAfterOrder(id, remainingitemStock);
      var addOrder = await db.addOrder(id, unitsOrder, itemName, status, totalPrice);
    }
    obj = {};
    prod.pop();
  };

  const addOrderToDb = async () => {
    var orders = props.orderData.userReducer.order;
    var prodIDS = [];
    var obj = {};
    for (var i = 0; i < orders.length; i++) {
      obj['itemId'] = orders[i].itemId;
      obj['itemName'] = orders[i].itemName;
      obj['unitsOrdered'] = orders[i].unitsOrdered;
      obj['status'] = orders[i].status;
      obj['totalPrice'] = orders[i].totalPrice;
      prodIDS.push(obj);
      obj = {};
    }

    for (var i = 0; i < prodIDS.length; i++) {
      await add(
        prodIDS[i].itemId,
        prodIDS[i].unitsOrdered,
        prodIDS[i].itemName,
        prodIDS[i].status,
        prodIDS[i].totalPrice,
      );
    };
    dispatch(updateOrderList());
    setListData(null);
    props.navigation.dispatch(StackActions.popToTop('Order Place'));
    navigate('OderList');
  };

  return (
    <>
      <CustomHeader title="Place Order" backIcon />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {
          data ? <OrderConfirmCard data={data} onConfirm={onConfirm} /> : null
        }
        {
          listData ? <ListRedux data={props.orderData.userReducer.order} addOrderToDb={addOrderToDb} /> : <Text style={{textAlign:'center',fontSize:16,marginTop:'70%'}}>No Item Added</Text>
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
