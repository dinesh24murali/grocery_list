import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ToastAndroid,
} from 'react-native';

import routes from '../../constants/routes';
import Icon from '../../components/Icons/Icon';
import formStyles from '../../styles/form';
import flexStyles from '../../styles/flex';
import TextInput from '../../components/Input/TextInput';
import Checkbox from '../../components/Checkbox/index';
import IconButton from '../../components/Button/IconButton';
import BadgeFilter from '../../components/BadgeFilter/BadgeFilter';
import TextSearch from '../../components/TextSearch/TextSearch';

import {
  fetchCategories,
  filterProducts,
  setItem,
  fetchProducts,
} from '../../store/slices/productsSlice';
import {
  createGroceryLists,
  updateGroceryLists,
  fetchGroceryLists,
  onDeleteGroceryList,
} from '../../store/slices/grocerySlice';
import {units, SELECTED_FILTER} from '../../constants/constants';
import theme from '../../constants/theme';

const {colors} = theme;

const ProductItem = ({id, name, unit, category, onChange, selected}) => {
  return (
    <Pressable style={styles.item} onPress={() => onChange(id)}>
      <Checkbox
        color={colors.primary}
        value={selected}
        onChange={() => onChange(id)}
      />
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.productName}>{name}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.category}>{units.label[unit]}</Text>
        </View>
      </View>
    </Pressable>
  );
};

function Index({
  navigation,
  route,
  products,
  categories,
  filteredProducts,
  categoryLabel,
  filterCategories,
  onFilterProducts,
  onGetCategory,
  onGetProducts,
  clearFilter,
  groceryLists,
  onCreateGroceryLists,
  onGetGroceryList,
  onUpdateGroceryLists,
  onDelete,
}) {
  const [name, setName] = useState();
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isArchived, setIsArchived] = useState(false);
  const [searchText, setSearchText] = useState('');
  const {id} = route.params ? route.params : {};

  const isFilterApplied = useMemo(() => {
    let temp = Object.keys(filterCategories).find(item => {
      return filterCategories[item] ? true : false;
    });

    return temp || searchText ? true : false;
  }, [filterCategories, searchText]);

  console.log({
    isFilterApplied,
  });

  useEffect(() => {
    navigation.setOptions({
      title: id ? 'Edit Grocery List' : 'Add New Grocery List',
    });
  }, []);

  useEffect(() => {
    if (groceryLists.length > 0 && id) {
      const temp = groceryLists.find(item => item.id === id);
      setName(temp.name);
      const tempProduct = {};
      temp.products.forEach(item => {
        tempProduct[item.product.id] = true;
      });
      setSelectedProducts(tempProduct);
      setIsArchived(temp.isArchived);
    }
  }, [groceryLists]);

  useEffect(() => {
    onGetCategory();
    onGetProducts();
    if (id) {
      onGetGroceryList();
    }
    return () => {
      clearFilter();
    };
  }, []);

  const onSelect = items => {
    onFilterProducts({category: items, searchText, groceryListId: id});
  };

  const onChange = tempId => {
    setSelectedProducts(state => {
      return {...state, [tempId]: state[tempId] ? false : true};
    });
  };

  const onSave = () => {
    if (!name) {
      ToastAndroid.show('Enter list name', ToastAndroid.SHORT);
      return;
    }
    let temp = Object.keys(selectedProducts);
    temp = temp.find(item => selectedProducts[item] === true);
    if (!temp) {
      ToastAndroid.show('Select at least one product', ToastAndroid.SHORT);
      return;
    }
    temp = Object.keys(selectedProducts);
    const tempNeeded = temp.filter(item => selectedProducts[item] === true);
    if (id) {
      onUpdateGroceryLists({
        id,
        name,
        isArchived,
        selectedProducts: tempNeeded,
        callback: () => {
          navigation.navigate(routes.home);
        },
      });
    } else {
      onCreateGroceryLists({
        name,
        isArchived,
        selectedProducts: tempNeeded,
        callback: () => {
          navigation.navigate(routes.home);
        },
      });
    }
  };

  const onSearch = value => {
    setSearchText(value ? value : '');
    onFilterProducts({
      category: filterCategories,
      searchText: value,
      groceryListId: id,
    });
  };

  return (
    <SafeAreaView style={styles.groceryContainer}>
      <View style={formStyles.formGroup}>
        <Text style={formStyles.label}>Name</Text>
        <TextInput value={name} onChange={value => setName(value)} />
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox value={isArchived} onChange={value => setIsArchived(value)} />
        <Pressable onPress={() => setIsArchived(state => !state)}>
          <Text style={formStyles.label}>Is archived</Text>
        </Pressable>
      </View>
      <View style={styles.actions}>
        <IconButton onPress={() => onSave()}>
          <View style={flexStyles.flexAlignCenter}>
            <Icon name="check" size={22} />
            <Text style={formStyles.btnText}>Save</Text>
          </View>
        </IconButton>
        <IconButton onPress={() => navigation.navigate(routes.home)}>
          <View style={flexStyles.flexAlignCenter}>
            <Icon color="red" name="times" size={22} />
            <Text style={formStyles.btnText}>Cancel</Text>
          </View>
        </IconButton>
        {id && (
          <IconButton onPress={() => onDelete()}>
            <View style={flexStyles.flexAlignCenter}>
              <Icon color="red" name="trash" size={22} />
              <Text style={formStyles.btnText}>Delete</Text>
            </View>
          </IconButton>
        )}
      </View>
      <BadgeFilter
        list={categories}
        onChange={value => onSelect(value)}
        selected={filterCategories}
      />
      <TextSearch searchText={searchText} onChange={value => onSearch(value)} />
      {isFilterApplied ? (
        <FlatList
          data={filteredProducts}
          renderItem={({item}) => {
            return (
              <ProductItem
                id={item.id}
                key={item.id}
                name={item.name}
                unit={item.unit}
                selected={selectedProducts[item.id]}
                category={categoryLabel[item.category]}
                onChange={value => onChange(value)}
              />
            );
          }}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={({item}) => {
            return (
              <ProductItem
                id={item.id}
                key={item.id}
                name={item.name}
                unit={item.unit}
                selected={selectedProducts[item.id]}
                category={categoryLabel[item.category]}
                onChange={value => onChange(value)}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  groceryContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    overflow: 'scroll',  // This fixed the issue with not able to scroll the items list
  },
  checkboxContainer: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    backgroundColor: colors.white,
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 6,
    borderRadius: 12,
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
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

const AddEditGroceryList = ({navigation, route}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.products.categories);
  const {id} = route.params ? route.params : {};
  let categoriesWithSelected = categories;
  if (id)
    categoriesWithSelected = [
      {id: SELECTED_FILTER, name: 'Selected'},
      ...categories,
    ];
  const products = useSelector(state => state.products.products);
  const filteredProducts = useSelector(
    state => state.products.filteredProducts,
  );
  const filterCategories = useSelector(
    state => state.products.filterCategories,
  );
  const groceryLists = useSelector(state => state.grocery.groceryLists);

  const categoryLabel = useMemo(() => {
    let temp = {};
    if (id)
      temp = {
        [SELECTED_FILTER]: 'Selected',
      };
    if (Array.isArray(categories)) {
      categories.forEach(item => {
        temp[item.id] = item.name;
      });
    }
    return temp;
  }, [categories, id]);

  const onGetCategory = () => {
    dispatch(fetchCategories());
  };

  const onGetProducts = () => {
    dispatch(fetchProducts());
  };

  const onFilterProducts = payload => {
    dispatch(filterProducts(payload));
  };

  const clearFilter = () => {
    dispatch(
      setItem({
        key: 'filterCategories',
        value: {},
      }),
    );
  };

  const onCreateGroceryLists = payload => {
    dispatch(createGroceryLists(payload));
  };

  const onUpdateGroceryLists = payload => {
    dispatch(updateGroceryLists(payload));
  };

  const onGetGroceryList = () => {
    dispatch(fetchGroceryLists());
  };

  const onDelete = () => {
    dispatch(
      onDeleteGroceryList(id, () => {
        ToastAndroid.show(
          'Successfully deleted Grocery List',
          ToastAndroid.SHORT,
        );
        navigation.navigate(routes.home);
      }),
    );
  };

  return (
    <Index
      onGetCategory={onGetCategory}
      onCreateGroceryLists={onCreateGroceryLists}
      onUpdateGroceryLists={onUpdateGroceryLists}
      onGetProducts={onGetProducts}
      clearFilter={clearFilter}
      onFilterProducts={onFilterProducts}
      onGetGroceryList={onGetGroceryList}
      onDelete={onDelete}
      categories={categoriesWithSelected}
      categoryLabel={categoryLabel}
      groceryLists={groceryLists}
      navigation={navigation}
      route={route}
      products={products}
      filteredProducts={filteredProducts}
      filterCategories={filterCategories}
    />
  );
};

export default AddEditGroceryList;
