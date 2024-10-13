import {createSlice} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {dbKeys} from '../../constants/constants';

export const grocerySlice = createSlice({
  name: 'grocery',
  initialState: {
    groceryListForBadge: [],
    groceryLists: [],
    filterCategories: {},
    filteredProducts: [],
  },
  reducers: {
    setItem: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const {setItem} = grocerySlice.actions;

const prepareGroceryList = async () => {
  try {
    let groceryList = await AsyncStorage.getItem(dbKeys.groceryList);
    groceryList = groceryList ? JSON.parse(groceryList) : [];
    // let categoryList = await AsyncStorage.getItem(dbKeys.categoryList);
    // categoryList = categoryList ? JSON.parse(categoryList) : [];
    let productList = await AsyncStorage.getItem(dbKeys.productList);
    productList = productList ? JSON.parse(productList) : [];
    let groceryLists = [];

    for (let i = 0; i < groceryList.length; i++) {
      const list = {
        name: groceryList[i].name,
        id: groceryList[i].id,
        isArchived: groceryList[i].isArchived,
        createdDate: groceryList[i].createdDate,
        products: [],
      };
      let tempGroceryList = await AsyncStorage.getItem(groceryList[i].id);

      tempGroceryList = tempGroceryList ? JSON.parse(tempGroceryList) : [];
      let products = [];
      tempGroceryList.forEach(item => {
        const tempProduct = productList.find(
          prodItem => prodItem.id === item.productId,
        );
        if (tempProduct) {
          products.push({
            product: tempProduct,
            qty: item.qty,
            isChecked: item.isChecked,
          });
        }
      });
      list.products = products;
      groceryLists.push(list);
    }
    return groceryLists;
  } catch (e) {
    return [];
  }
};

export const fetchGroceryLists = () => {
  return async dispatch => {
    try {
      const tempData = await prepareGroceryList();
      if (Array.isArray(tempData)) {
        dispatch(
          setItem({
            key: 'groceryLists',
            value: tempData,
          }),
        );
      }

      let data = await AsyncStorage.getItem(dbKeys.groceryList);
      data = data ? JSON.parse(data) : [];

      if (Array.isArray(data)) {
        dispatch(
          setItem({
            key: 'groceryListForBadge',
            value: data,
          }),
        );
      }
    } catch (e) {
      return '';
    }
  };
};

export const createGroceryLists = payload => {
  return async dispatch => {
    try {
      const {name, isArchived, selectedProducts,callback} = payload;
      const id = uuid.v4();
      let data = await AsyncStorage.getItem(dbKeys.groceryList);
      data = data ? JSON.parse(data) : [];
      const tempDate = new Date();
      data.push({
        id,
        name,
        isArchived,
        createdDate: `${tempDate.getDate()}-${
          tempDate.getMonth() + 1
        }-${tempDate.getFullYear()}`,
      });

      await AsyncStorage.setItem(dbKeys.groceryList, JSON.stringify(data));

      const list = [];
      selectedProducts.forEach(item => {
        list.push({
          productId: item,
          qty: 0,
          isChecked: false,
        });
      });

      await AsyncStorage.setItem(id, JSON.stringify(list));
      dispatch(
        setItem({
          key: 'groceryListForBadge',
          value: data,
        }),
      );

      const tempData = await prepareGroceryList();
      if (Array.isArray(tempData)) {
        dispatch(
          setItem({
            key: 'groceryLists',
            value: tempData,
          }),
        );
      }

      callback();
    } catch (e) {
      payload.callback();
      return '';
    }
  };
};

export const updateGroceryLists = payload => {
  return async dispatch => {
    try {
      const {id, name, callback, isArchived, selectedProducts} = payload;

      let data = await AsyncStorage.getItem(dbKeys.groceryList);
      data = data ? JSON.parse(data) : [];
      const index = data.findIndex(item => item.id === id);
      if (index < 0) {
        callback();
        return;
      }
      data[index].name = name;
      data[index].isArchived = isArchived;

      await AsyncStorage.setItem(dbKeys.groceryList, JSON.stringify(data));

      let oldList = await AsyncStorage.getItem(id);
      oldList = oldList ? JSON.parse(oldList) : [];
      const newItems = selectedProducts.filter(item => {
        const isPresent = oldList.find(item2 => {
          if (item === item2.productId) {
            return true;
          }
          return false;
        });
        return isPresent ? false : true;
      });
      const updatedItemsList = oldList.filter(item => {
        const isPresent = selectedProducts.find(selectedItem => {
          if (item.productId === selectedItem) {
            return true;
          }
          return false;
        });
        return isPresent ? true : false;
      });
      newItems.forEach(item => {
        updatedItemsList.unshift({
          productId: item,
          qty: 0,
          isChecked: false,
        });
      });

      await AsyncStorage.setItem(id, JSON.stringify(updatedItemsList));
      dispatch(
        setItem({
          key: 'groceryListForBadge',
          value: data,
        }),
      );

      const tempData = await prepareGroceryList();

      if (Array.isArray(tempData)) {
        dispatch(
          setItem({
            key: 'groceryLists',
            value: tempData,
          }),
        );
      }

      callback();
    } catch (e) {
      payload.callback();
      return '';
    }
  };
};

export const groceryListItemChange = payload => {
  return async () => {
    try {
      const {id, productId, type, value} = payload;

      let oldList = await AsyncStorage.getItem(id);
      oldList = oldList ? JSON.parse(oldList) : [];
      const index = oldList.findIndex(item => item.productId === productId);
      if (index < 0) {
        return;
      }
      switch (type) {
        case 'isChecked':
          oldList[index].isChecked = value;
          break;
        case 'qty':
          oldList[index].qty = value;
          break;
      }
      await AsyncStorage.setItem(id, JSON.stringify(oldList));
    } catch (e) {
      return '';
    }
  };
};

export const clearGroceryList = id => {
  return async () => {
    try {
      let oldList = await AsyncStorage.getItem(id);
      oldList = oldList ? JSON.parse(oldList) : [];
      const temp = oldList.map(item => {
        return {
          ...item,
          qty: 0,
          isChecked: false,
        };
      });
      await AsyncStorage.setItem(id, JSON.stringify(temp));
    } catch (e) {
      return '';
    }
  };
};

export default grocerySlice.reducer;
