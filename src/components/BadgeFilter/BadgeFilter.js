import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
import theme from '../../constants/theme';
import IconButton from '../../components/Button/IconButton';
import Icon from '../../components/Icons/Icon';

const {colors} = theme;

const BadgeFilter = ({list = [], selected = {}, onChange = () => {}}) => {
  const [isExpand, setIsExpand] = useState(false);

  const onSelect = id => {
    onChange({...selected, [id]: selected[id] ? false : true});
  };

  return (
    <View
      style={isExpand ? styles.flexColumnAlignCenter : styles.flexAlignCenter}>
      {isExpand ? (
        <View style={styles.flexWrap}>
          {list.map(item => {
            let style = {...styles.badge, marginBottom: 6};
            let text = styles.productName;
            if (selected[item.id]) {
              style = {
                ...style,
                ...styles.badgeSelected,
              };
              text = {
                ...text,
                color: colors.white,
              };
            }
            return (
              <Pressable
                onPress={() => onSelect(item.id)}
                style={style}
                key={item.id}>
                <Text style={text}>{item.name}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <ScrollView horizontal={true} style={styles.filterContainer}>
          {list.map(item => {
            let style = {...styles.badge};
            let text = styles.productName;
            if (selected[item.id]) {
              style = {
                ...style,
                ...styles.badgeSelected,
              };
              text = {
                ...text,
                color: colors.white,
              };
            }
            return (
              <Pressable
                onPress={() => onSelect(item.id)}
                style={style}
                key={item.id}>
                <Text style={text}>{item.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      <View style={{alignItems: 'baseline'}}>
        <IconButton
          style={{marginBottom: 12, marginTop: isExpand ? 12 : 0, padding: 6}}
          onPress={() => setIsExpand(state => !state)}>
          <View style={styles.flexAlignCenter}>
            <Icon name={isExpand ? 'caret-up' : 'caret-down'} size={22} />
            <Text style={styles.btnText}>{isExpand ? 'Less' : 'More'}</Text>
          </View>
        </IconButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '900',
    marginLeft: 6,
  },
  flexAlignCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumnAlignCenter: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexWrap: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterContainer: {
    padding: 6,
    marginBottom: 12,
    marginRight: 6,
    display: 'flex',
    flexDirection: 'row',
  },
  badge: {
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 6,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: 10,
  },
  badgeSelected: {
    backgroundColor: colors.primary,
  },
  productName: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 6,
  },
});

export default BadgeFilter;
