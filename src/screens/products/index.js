import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, FlatList, View, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

import {
  fetchCategories,
  fetchProducts,
  deleteProduct,
  filterProducts,
} from '../../store/slices/productsSlice';
import IconButton from '../../components/Button/IconButton';
import TextSearch from '../../components/TextSearch/TextSearch';
import BadgeFilter from '../../components/BadgeFilter/BadgeFilter';
import Icon from '../../components/Icons/Icon';
import PlusIcon from '../../components/Icons/plus';
import theme from '../../constants/theme';
import {units} from '../../constants/constants';
import routes from '../../constants/routes';
import flexStyles from '../../styles/flex';
import formStyles from '../../styles/form';

const {colors} = theme;

const ProductItem = ({id, name, unit, category, onEdit, onDelete}) => {
  return (
    <View style={styles.item}>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.productName}>{name}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.category}>{units.label[unit]}</Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <IconButton onPress={() => onEdit(id)}>
          <Icon name="pencil" size={22} />
        </IconButton>
        <IconButton onPress={() => onDelete(id)}>
          <Icon name="trash" size={22} />
        </IconButton>
      </View>
    </View>
  );
};

function Index({
  products,
  navigation,
  categories,
  categoryLabel,
  onGetCategory,
  onGetProducts,
  onDeleteProduct,
  onFilterProducts,
  filteredProducts,
  filterCategories,
}) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton onPress={() => navigation.navigate(routes.addProduct)}>
          <View style={flexStyles.flexAlignCenter}>
            <PlusIcon size={22} />
            <Text style={formStyles.btnText}>Add</Text>
          </View>
        </IconButton>
      ),
    });
    // onGetCategory();
    // onGetProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      onGetProducts();
      onGetCategory();
    }, []),
  );

  const isFilterApplied = useMemo(() => {
    let temp = Object.keys(filterCategories).find(item => {
      return filterCategories[item] ? true : false;
    });

    return temp || searchText ? true : false;
  }, [filterCategories, searchText]);

  const onSelect = items => {
    onFilterProducts({category: items, searchText: searchText});
  };

  const onDelete = id => {
    const tempId = id;
    Alert.alert(
      'Delete product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            onDeleteProduct(tempId);
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  const onEdit = id => {
    navigation.navigate(routes.addProduct, {
      id: id,
    });
  };

  const onChange = value => {
    setSearchText(value ? value : '');
    onFilterProducts({category: filterCategories, searchText: value});
  };

  return (
    <SafeAreaView style={styles.productContainer}>
      <BadgeFilter
        list={categories}
        onChange={value => onSelect(value)}
        selected={filterCategories}
      />
      <TextSearch searchText={searchText} onChange={value => onChange(value)} />
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
                category={categoryLabel[item.category]}
                onEdit={() => onEdit(item.id)}
                onDelete={() => onDelete(item.id)}
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
                category={categoryLabel[item.category]}
                onEdit={() => onEdit(item.id)}
                onDelete={() => onDelete(item.id)}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    marginTop: 4,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  item: {
    backgroundColor: colors.white,
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

const ProductsContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.products.categories);
  const products = useSelector(state => state.products.products);
  const filteredProducts = useSelector(
    state => state.products.filteredProducts,
  );
  const filterCategories = useSelector(
    state => state.products.filterCategories,
  );

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

  const onGetProducts = () => {
    dispatch(fetchProducts());
  };

  const onDeleteProduct = payload => {
    dispatch(deleteProduct(payload));
  };

  const onFilterProducts = payload => {
    dispatch(filterProducts(payload));
  };

  return (
    <Index
      onGetCategory={onGetCategory}
      onGetProducts={onGetProducts}
      onDeleteProduct={onDeleteProduct}
      onFilterProducts={onFilterProducts}
      categories={categories}
      categoryLabel={categoryLabel}
      filterCategories={filterCategories}
      products={products}
      filteredProducts={filteredProducts}
      navigation={navigation}
    />
  );
};

export default ProductsContainer;
