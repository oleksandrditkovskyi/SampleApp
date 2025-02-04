import { useCallback, useEffect, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { BlurView } from '@react-native-community/blur';

import { cities } from './utils/cities';

import { City } from './components/City';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';
import { getFromStorage, saveToStorage } from '@utils/storageService';

import { styles } from './styles';

type ListItem = {
  item: string;
};

export const ManageLocationScreen = () => {
  const [opacity] = useState(new Animated.Value(0));
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [multiSelectFocused, setMultiSelectFocused] = useState(false);

  const multiSelectOnFocus = () => setMultiSelectFocused(true);
  const multiSelectOnBlur = () => setMultiSelectFocused(false);

  const onChange = async (value: string[]) => {
    const saveCities = async () => {
      await saveToStorage('citiesList', value);
    };

    saveCities();
    setSelectedCities(value);
  };

  const renderItem = useCallback(
    ({ item }: ListItem) => (
      <City
        array={selectedCities}
        item={item}
        setSelectedCities={setSelectedCities}
      />
    ),
    [selectedCities],
  );

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: multiSelectFocused ? 0 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [multiSelectFocused]);

  useEffect(() => {
    const getCitiesList = async () => {
      const list = await getFromStorage<string[]>('citiesList');

      setSelectedCities(list || []);
    };

    getCitiesList();
  }, []);

  return (
    <View style={styles.container}>
      <BlurView
        blurAmount={commonValues.SIZE_20}
        blurType="dark"
        reducedTransparencyFallbackColor="white"
        style={styles.glassEffect}
      />

      <MultiSelect
        activeColor={colors.WHITE_TRANSPARENT_40}
        containerStyle={styles.multiSelectContainerStyle}
        data={cities}
        fontFamily="Poppins-Regular"
        iconColor={colors.WHITE}
        itemTextStyle={styles.multiSelectItemTextStyle}
        labelField="label"
        maxSelect={20}
        placeholder={`Select City(${selectedCities.length})`}
        placeholderStyle={styles.multiSelectItemTextStyle}
        showsVerticalScrollIndicator={false}
        style={styles.multiSelectStyle}
        value={selectedCities}
        valueField="value"
        visibleSelectedItem={false}
        onBlur={multiSelectOnBlur}
        onChange={onChange}
        onFocus={multiSelectOnFocus}
      />

      <Animated.View style={[styles.flatListWrap, { opacity }]}>
        <FlatList
          data={selectedCities}
          renderItem={renderItem}
          style={styles.flatListWrap}
        />
      </Animated.View>
    </View>
  );
};
