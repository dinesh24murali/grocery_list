import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import {dbKeys} from '../../constants/constants';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    products: [],
    filterCategories: {},
    filteredProducts: [],
  },
  reducers: {
    setItem: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const {setItem} = productsSlice.actions;

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const {categories} = state.products;
      if (categories.length > 0) {
        return '';
      }
      let data = await AsyncStorage.getItem(dbKeys.categoryList);
      data = data ? JSON.parse(data) : [];
      if (Array.isArray(data)) {
        dispatch(
          setItem({
            key: 'categories',
            value: data,
          }),
        );
      }
    } catch (e) {
      return '';
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const {products} = state.products;
      if (products.length > 0) {
        return '';
      }
      let data = await AsyncStorage.getItem(dbKeys.productList);
      data = data ? JSON.parse(data) : [];
      if (Array.isArray(data)) {
        dispatch(
          setItem({
            key: 'products',
            value: data,
          }),
        );
      }
    } catch (e) {
      return '';
    }
  };
};

export const addProduct = ({payload, callback}) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      let {products} = state.products;
      if (products.length < 0) {
        let data = await AsyncStorage.getItem(dbKeys.productList);
        products = data ? JSON.parse(data) : [];
      }
      products = JSON.parse(JSON.stringify(products));
      const id = uuid.v4();
      if (payload.isNewCategory) {
        let tempCategory = await AsyncStorage.getItem(dbKeys.categoryList);
        const categoryId = uuid.v4();
        if (tempCategory) {
          tempCategory = JSON.parse(tempCategory);
          tempCategory.push({
            id: categoryId,
            name: payload.categoryName,
          });
        } else {
          const temp = {
            id: categoryId,
            name: payload.categoryName,
          };
          tempCategory = [temp];
        }
        await AsyncStorage.setItem(
          dbKeys.categoryList,
          JSON.stringify(tempCategory),
        );
        const temp = {
          id,
          name: payload.name,
          category: categoryId,
          unit: payload.unit,
        };
        products.push(temp);
        dispatch(
          setItem({
            key: 'categories',
            value: tempCategory,
          }),
        );
        await AsyncStorage.setItem(
          dbKeys.productList,
          JSON.stringify(products),
        );
      } else {
        const temp = {
          id,
          name: payload.name,
          category: payload.category,
          unit: payload.unit,
        };
        products.push(temp);
        await AsyncStorage.setItem(
          dbKeys.productList,
          JSON.stringify(products),
        );
      }

      if (Array.isArray(products)) {
        dispatch(
          setItem({
            key: 'products',
            value: products,
          }),
        );
      }
      if (callback) {
        callback();
      }
    } catch (e) {
      return '';
    }
  };
};

export const deleteProduct = id => {
  return async dispatch => {
    try {
      let data = await AsyncStorage.getItem(dbKeys.productList);
      data = data ? JSON.parse(data) : [];
      const filteredList = data.filter(item => item.id !== id);
      if (Array.isArray(filteredList)) {
        dispatch(
          setItem({
            key: 'products',
            value: filteredList,
          }),
        );
        await AsyncStorage.setItem(
          dbKeys.productList,
          JSON.stringify(filteredList),
        );
      }
    } catch (e) {
      return '';
    }
  };
};

export const editProduct = payload => {
  return async dispatch => {
    try {
      let temp = await AsyncStorage.getItem(dbKeys.productList);
      temp = temp ? JSON.parse(temp) : [];
      const {data, id, callback} = payload;
      const index = temp.findIndex(item => item.id === id);
      if (Array.isArray(temp) && temp[index]) {
        if (data.isNewCategory) {
          let tempCategory = await AsyncStorage.getItem(dbKeys.categoryList);
          tempCategory = tempCategory ? JSON.parse(tempCategory) : [];
          const categoryId = uuid.v4();
          temp[index].category = categoryId;
          tempCategory.push({
            name: data.categoryName,
            id: categoryId,
          });
          dispatch(
            setItem({
              key: 'categories',
              value: tempCategory,
            }),
          );
        } else {
          temp[index].category = data.category;
        }
        temp[index].name = data.name;
        temp[index].unit = data.unit;
        await AsyncStorage.setItem(dbKeys.productList, JSON.stringify(temp));
        dispatch(
          setItem({
            key: 'products',
            value: temp,
          }),
        );
      }

      if (callback) {
        callback();
      }
    } catch (e) {
      return '';
    }
  };
};

export const filterProducts = ({category, searchText}) => {
  return async dispatch => {
    try {
      let temp = await AsyncStorage.getItem(dbKeys.productList);
      temp = temp ? JSON.parse(temp) : [];
      dispatch(
        setItem({
          key: 'filterCategories',
          value: category,
        }),
      );
      let isCategoryFilterEmpty = false;
      if (category) {
        isCategoryFilterEmpty = Object.keys(category).find(item => {
          return category[item] ? true : false;
        });
      }
      if (isCategoryFilterEmpty) {
        temp = temp.filter(item => category[item.category]);
      }
      if (searchText) {
        temp = temp.filter(item =>
          item.name
            ? item.name.toLowerCase().includes(searchText.toLowerCase())
            : false,
        );
      }
      dispatch(
        setItem({
          key: 'filteredProducts',
          value: temp,
        }),
      );
    } catch (e) {
      return '';
    }
  };
};

export default productsSlice.reducer;
