import React, {useEffect, useCallback, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ScrollView, StyleSheet, Text, Pressable, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BadgeFilter from '../../components/BadgeFilter/BadgeFilter';
import LinkButton from '../../components/Button/linkButton';
import Icon from '../../components/Icons/Icon';
import IconButton from '../../components/Button/IconButton';
import flexStyles from '../../styles/flex';
import routes from '../../constants/routes';
import theme from '../../constants/theme';
import {
  fetchGroceryLists,
  groceryListItemChange,
  clearGroceryList,
} from '../../store/slices/grocerySlice';
import Checkbox from '../../components/Checkbox/index';
import {units} from '../../constants/constants';
import {fetchCategories} from '../../store/slices/productsSlice';
import TextInput from '../../components/Input/TextInput';

const {colors} = theme;

const ProductItem = ({
  id,
  qty,
  name,
  unit,
  isFirst,
  isLast,
  category,
  onChange,
  selected,
  groceryListId,
}) => {
  let tempClass = styles.item;

  if (isFirst) {
    tempClass = {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      ...tempClass,
    };
  }
  if (isLast) {
    tempClass = {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      ...tempClass,
    };
  }

  const handleChange = (value, type) => {
    onChange(groceryListId, id, value, type);
  };

  return (
    <Pressable style={tempClass}>
      <Checkbox
        color={colors.primary}
        value={selected}
        onChange={() => handleChange(!selected, 'isChecked')}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.productName}>{name}</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.category}>{units.label[unit]}</Text>
          </View>
        </View>
        <TextInput
          keyboardType="numeric"
          style={{marginTop: 0, width: 60}}
          value={qty}
          onChange={value => handleChange(value, 'qty')}
        />
      </View>
    </Pressable>
  );
};

function Index({
  navigation,
  route,
  onGetGroceryList,
  onGetCategory,
  groceryListForBadge,
  categoryLabel,
  groceryLists,
  clearAll,
  onItemChange,
  filteredList,
  setFilteredList,
}) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={flexStyles.flexAlignCenter}>
          <IconButton
            style={{marginRight: 12}}
            onPress={() => navigation.navigate(routes.addGroceryList)}>
            <View style={flexStyles.flexAlignCenter}>
              <Icon name="plus" size={22} />
              {/* <Text style={formStyles.btnText}>
                                Add
                            </Text> */}
            </View>
          </IconButton>
          <IconButton onPress={() => navigation.navigate(routes.products)}>
            <View style={flexStyles.flexAlignCenter}>
              <Icon name="cog" size={22} />
              {/* <Text style={formStyles.btnText}>
                                Products
                            </Text> */}
            </View>
          </IconButton>
        </View>
      ),
    });
  }, []);

  // useEffect(() => {
  //     onGetGroceryList();
  //     onGetCategory();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // return () => {
      //     console.log("Home un focus");
      //     // Do something when the screen is unfocused
      //     // Useful for cleanup functions
      // };
      onGetGroceryList();
      onGetCategory();
      console.log(' Home focus ');
    }, []),
  );

  const onEdit = id => {
    navigation.navigate(routes.addGroceryList, {
      id: id,
    });
  };

  const onSelect = event => {
    setFilteredList(event);
  };

  const onChange = (groceryId, id, value, type) => {
    onItemChange({
      id: groceryId,
      productId: id,
      value,
      type,
    });
  };

  return (
    <SafeAreaView style={styles.groceryContainer}>
      <BadgeFilter
        list={groceryListForBadge}
        onChange={value => onSelect(value)}
        selected={filteredList}
      />
      <ScrollView style={styles.listWrapper}>
        {groceryLists.map(list => (
          <View key={list.id} style={styles.listContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{list.name}</Text>
              <View style={styles.groceryAction}>
                <LinkButton
                  style={{marginRight: 10}}
                  onPress={() => clearAll(list.id)}
                  title="clear all"
                />
                <IconButton onPress={() => onEdit(list.id)}>
                  <Icon name="pencil" size={22} />
                </IconButton>
              </View>
            </View>
            <View style={styles.productList}>
              {/* <FlatList
                        data={list.products}
                        renderItem={({ item, index }) => {
                            return <ProductItem
                                groceryListId={list.id}
                                id={item.id}
                                isFirst={index === 0}
                                isLast={index === list.products.length - 1}
                                name={item.product.name}
                                unit={item.product.unit}
                                category={categoryLabel[item.product.category]}
                                onChange={onChange}
                                selected={item.isChecked}
                                qty={item.qty}
                            />
                        }}>
                    </FlatList> */}
              {list.products.map((item, index) => (
                <ProductItem
                  groceryListId={list.id}
                  id={item.product.id}
                  key={item.id}
                  isFirst={index === 0}
                  isLast={index === list.products.length - 1}
                  name={item.product.name}
                  unit={item.product.unit}
                  category={categoryLabel[item.product.category]}
                  onChange={onChange}
                  selected={item.isChecked}
                  qty={item.qty}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  groceryContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  listWrapper: {
    marginBottom: 80,
  },
  listContainer: {
    marginBottom: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    // padding: 12,
    color: colors.white,
    // fontWeight: 'bold'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
  },
  item: {
    backgroundColor: colors.white,
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginBottom: 6,
    // borderRadius: 12
  },
  productName: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '700',
    marginLeft: 6,
  },
  category: {
    fontSize: 12,
    color: colors.black,
    marginLeft: 6,
    marginRight: 12,
  },
  groceryAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const GroceryList = ({navigation, route}) => {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filteredList, setFilteredList] = useState({});
  const dispatch = useDispatch();
  const groceryListForBadge = useSelector(
    state => state.grocery.groceryListForBadge,
  );
  const groceryLists = useSelector(state => state.grocery.groceryLists);
  const categories = useSelector(state => state.products.categories);

  const isFilterApplied = useMemo(() => {
    const tempList = Object.keys(filteredList);
    const isApplied = tempList.find(item =>
      filteredList[item] ? true : false,
    );
    return isApplied;
  }, [filteredList]);

  useEffect(() => {
    if (groceryLists.length > 0) {
      setList(groceryLists);
    }
  }, [groceryLists]);

  const categoryLabel = useMemo(() => {
    const temp = {};
    if (Array.isArray(categories)) {
      categories.forEach(item => {
        temp[item.id] = item.name;
      });
    }
    return temp;
  }, [categories]);

  const onGetCategory = () => {
    dispatch(fetchCategories());
  };

  const onGetGroceryList = () => {
    dispatch(fetchGroceryLists());
  };

  const onItemChange = payload => {
    const {id, productId, type, value} = payload;

    dispatch(groceryListItemChange(payload));
    setList(state => {
      const temp = JSON.parse(JSON.stringify(state));
      const index = temp.findIndex(item => item.id === id);
      if (temp[index]) {
        const prodIndex = temp[index].products.findIndex(
          item => item.product.id === productId,
        );
        if (temp[index].products[prodIndex]) {
          temp[index].products[prodIndex][type] = value;
        }
      }
      return temp;
    });
  };

  const clearAll = id => {
    dispatch(clearGroceryList(id));
    setList(state => {
      const temp = JSON.parse(JSON.stringify(state));
      const index = temp.findIndex(item => item.id === id);
      if (temp[index]) {
        const products = temp[index].products.map(item => {
          return {
            ...item,
            qty: 0,
            isChecked: false,
          };
        });
        temp[index].products = products;
      }
      return temp;
    });
  };

  const onFilter = data => {
    setFilteredList(data);
    const tempList = list.filter(item => (data[item.id] ? true : false));
    setFiltered(tempList);
  };

  return (
    <Index
      onGetGroceryList={onGetGroceryList}
      onGetCategory={onGetCategory}
      onItemChange={onItemChange}
      clearAll={clearAll}
      filteredList={filteredList}
      setFilteredList={onFilter}
      navigation={navigation}
      categoryLabel={categoryLabel}
      route={route}
      groceryListForBadge={groceryListForBadge}
      groceryLists={isFilterApplied ? filtered : list}
    />
  );
};

export default GroceryList;
