function updateOrderList(order)
{
  console.log('action calleddddd ->', order);
  return {
    type: 'UPDATE_ORDER_LIST', //constant strings
    data: order

  }
}

export {
    updateOrderList
  }