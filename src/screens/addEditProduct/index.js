import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';

import TextInput from '../../components/Input/TextInput';
import IconButton from '../../components/Button/IconButton';
import formStyles from '../../styles/form';
import flexStyles from '../../styles/flex';
import Select from '../../components/Input/Select';
import {addProduct, editProduct} from '../../store/slices/productsSlice';
import {units} from '../../constants/constants';
import routes from '../../constants/routes';
import Icon from '../../components/Icons/Icon';

function Index({
  navigation,
  createProduct,
  updateProduct,
  categories,
  products,
  route,
}) {
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [categoryName, setCategoryName] = useState('');
  const [addCategoryToggle, setAddCategoryToggle] = useState(false);
  const [unit, setUnit] = useState(units.KG);
  const {id} = route.params ? route.params : {};

  useEffect(() => {
    navigation.setOptions({
      title: id ? 'Edit Product' : 'Add New Product',
    });
    if (id) {
      const temp = products.find(item => item.id === id);
      setName(temp.name);
      setCategory(temp.category);
      setUnit(temp.unit);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(categories) && categories.length > 0 && !id) {
      const [first] = categories;
      setCategory(first.id);
    }
  }, [categories]);

  const onChange = (value, type) => {
    switch (type) {
      case 'name':
        setName(value);
        return;
      case 'categoryName':
        setCategoryName(value);
        return;
      case 'category':
        setCategory(value);
        return;
      case 'unit':
        setUnit(value);
        return;
    }
  };

  const onSave = () => {
    if (!name || !unit) {
      return;
    }
    if (
      (!addCategoryToggle && !category) ||
      (addCategoryToggle && !categoryName)
    ) {
      return;
    }
    if (id) {
      updateProduct({
        data: {
          isNewCategory: addCategoryToggle,
          name,
          categoryName: categoryName,
          category: category,
          unit: unit,
        },
        id: id,
        callback: () => {
          navigation.navigate(routes.products);
        },
      });
    } else {
      createProduct({
        payload: {
          isNewCategory: addCategoryToggle,
          name,
          categoryName: categoryName,
          category: category,
          unit: unit,
        },
        callback: () => {
          navigation.navigate(routes.products);
        },
      });
    }
  };

  const toggleAddCategory = () => {
    if (!addCategoryToggle) {
      setCategoryName('');
    }
    setAddCategoryToggle(state => !state);
  };

  return (
    <SafeAreaView style={styles.productContainer}>
      <View style={formStyles.formGroup}>
        <Text style={formStyles.label}>Name</Text>
        <TextInput value={name} onChange={value => onChange(value, 'name')} />
      </View>
      <View style={formStyles.formGroup}>
        <Text style={formStyles.label}>Category</Text>
        {addCategoryToggle ? (
          <TextInput
            value={categoryName}
            onChange={value => onChange(value, 'categoryName')}
          />
        ) : (
          <Select
            placeholder="Select category"
            list={categories}
            value={category}
            onChange={value => onChange(value, 'category')}
          />
        )}
        <View style={{alignItems: 'baseline', marginTop: 10}}>
          <IconButton onPress={() => toggleAddCategory()}>
            <View style={flexStyles.flexAlignCenter}>
              <Icon name={addCategoryToggle ? 'times' : 'plus'} size={22} />
              <Text style={formStyles.btnText}>
                {addCategoryToggle ? 'Cancel' : 'Add new'}
              </Text>
            </View>
          </IconButton>
        </View>
      </View>
      <View style={formStyles.formGroup}>
        <Text style={formStyles.label}>Unit</Text>
        <Select
          placeholder="Select unit"
          list={units.choices}
          value={unit}
          onChange={value => onChange(value, 'unit')}
        />
      </View>
      <View style={styles.actions}>
        <IconButton onPress={() => onSave()}>
          <View style={flexStyles.flexAlignCenter}>
            <Icon name="check" size={22} />
            <Text style={formStyles.btnText}>Save</Text>
          </View>
        </IconButton>
        <IconButton onPress={() => navigation.navigate(routes.products)}>
          <View style={flexStyles.flexAlignCenter}>
            <Icon color="red" name="times" size={22} />
            <Text style={formStyles.btnText}>Cancel</Text>
          </View>
        </IconButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  number: {
    marginTop: 32,
    fontSize: 20,
    fontWeight: '600',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

const AddEditProductsContainer = ({navigation, route}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.products.categories);
  const products = useSelector(state => state.products.products);

  const createProduct = payload => {
    dispatch(addProduct(payload));
  };

  const updateProduct = payload => {
    dispatch(editProduct(payload));
  };

  return (
    <Index
      createProduct={createProduct}
      updateProduct={updateProduct}
      categories={categories}
      products={products}
      navigation={navigation}
      route={route}
    />
  );
};

export default AddEditProductsContainer;
